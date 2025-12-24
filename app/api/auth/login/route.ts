import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { vendors, activityLogs } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, role } = body;

        // 1. Log Activity
        await db.insert(activityLogs).values({
            type: "USER_LOGIN",
            message: `${name} (${role}) logged in to the platform`,
        });

        // 2. Sync Vendor Data
        if (role === "vendor") {
            const existing = await db.select().from(vendors).where(eq(vendors.email, email));
            
            if (existing.length > 0) {
                // Update vendor name if changed
                await db.update(vendors)
                    .set({ vendorName: name })
                    .where(eq(vendors.email, email));
            } else {
                // Create new vendor profile
                await db.insert(vendors).values({
                    vendorName: name,
                    email: email,
                    status: "PENDING", // Default to PENDING as per schema default
                    fulfillmentRate: "100.00",
                    totalOrders: 0,
                });
            }
        }

        return NextResponse.json({ success: true, message: "Login synchronized to DB" });
    } catch (error) {
        console.error("Login Sync Error:", error);
        return NextResponse.json({ success: false, error: "Failed to log activity" }, { status: 500 });
    }
}
