import { db } from "@/config/db";
import { users, vendors } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

async function syncWithRetry(attempt = 1): Promise<any> {
    try {
        const user = await currentUser();
        if (!user) throw new Error("UNAUTHORIZED");

        const email = user.emailAddresses[0].emailAddress;
        const clerkRole = (user.publicMetadata?.role as string)?.toUpperCase() || "VENDOR";

        // Query with a direct select to check existence
        const existingUsers = await db
            .select()
            .from(users)
            .where(eq(users.clerkUserId, user.id))
            .limit(1);

        let dbUser = existingUsers[0];

        if (!dbUser) {
            let vendorId = null;
            if (clerkRole === "VENDOR") {
                const newVendor = await db.insert(vendors).values({
                    vendorName: user.fullName || email.split("@")[0] + "'s Store",
                    email: email,
                    status: "ACTIVE",
                }).returning();
                vendorId = newVendor[0].id;
            }

            const newUser = await db.insert(users).values({
                clerkUserId: user.id,
                name: user.fullName || email.split("@")[0],
                email: email,
                role: clerkRole as "ADMIN" | "VENDOR",
                vendorId: vendorId
            }).returning();
            dbUser = newUser[0];
        } else if (dbUser.role !== clerkRole) {
            const updated = await db.update(users)
                .set({ role: clerkRole as "ADMIN" | "VENDOR" })
                .where(eq(users.id, dbUser.id))
                .returning();
            dbUser = updated[0];
        }

        return dbUser;
    } catch (error: any) {
        if (attempt < 3 && (error.code === 'ENOTFOUND' || error.message.includes('timeout'))) {
            console.log(`⚠️ Connection attempt ${attempt} failed. Retrying...`);
            await new Promise(r => setTimeout(r, 1000 * attempt));
            return syncWithRetry(attempt + 1);
        }
        throw error;
    }
}

export async function GET() {
    try {
        const dbUser = await syncWithRetry();
        return NextResponse.json(dbUser);
    } catch (error) {
        console.error("Sync Final Failure:", error);
        return NextResponse.json({
            error: "DATABASE_CONNECTION_ERROR",
            details: "The database took too long to respond or the network dropped. Please refresh."
        }, { status: 500 });
    }
}
