import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { orders, vendors } from "@/config/schema";
import { eq, desc } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

async function fetchOrdersWithRetry(vendorId: string, attempt = 1): Promise<any> {
    try {
        const allOrders = await db.select()
            .from(orders)
            .where(eq(orders.vendorId, vendorId))
            .orderBy(desc(orders.updatedAt), desc(orders.createdAt));
        return allOrders;
    } catch (error: any) {
        if (attempt < 3 && (error.code === 'ENOTFOUND' || error.message.includes('timeout'))) {
            console.log(`⚠️ Orders fetch attempt ${attempt} failed. Retrying...`);
            await new Promise(r => setTimeout(r, 1000 * attempt));
            return fetchOrdersWithRetry(vendorId, attempt + 1);
        }
        throw error;
    }
}

export async function GET(request: Request) {
    try {
        const user = await currentUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(request.url);
        let vendorId = searchParams.get("vendorId");

        if (!vendorId || vendorId === "null" || vendorId === "undefined" || vendorId === "") {
            const firstVendor = await db.select().from(vendors).limit(1);
            if (firstVendor.length > 0) {
                vendorId = firstVendor[0].id;
            } else {
                return NextResponse.json({ error: "No vendors available" }, { status: 404 });
            }
        }

        const allOrders = await fetchOrdersWithRetry(vendorId!);

        return NextResponse.json(allOrders.map((o: any) => ({
            id: o.orderCode,
            product: "Marketplace Item",
            quantity: 1,
            status: o.status.charAt(0).toUpperCase() + o.status.slice(1).toLowerCase(),
            date: new Date(o.createdAt).toISOString().split('T')[0],
            customer: o.customerName,
            address: `${o.customerCity}, ${o.customerState}`,
            price: `₹${parseFloat(o.totalAmountINR).toLocaleString('en-IN')}`
        })));
    } catch (e) {
        console.error("❌ Vendor Orders API Error:", e);
        return NextResponse.json({ error: "DATABASE_ERROR", details: "DNS or Connection Timeout" }, { status: 500 });
    }
}
