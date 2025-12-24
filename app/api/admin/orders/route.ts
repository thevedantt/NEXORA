import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { orders, vendors } from "@/config/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
    try {
        const allOrders = await db.select({
            id: orders.id,
            orderCode: orders.orderCode,
            customerName: orders.customerName,
            customerCity: orders.customerCity,
            vendorName: vendors.vendorName,
            vendorId: vendors.id,
            status: orders.status,
            createdAt: orders.createdAt,
            totalAmountINR: orders.totalAmountINR
        })
            .from(orders)
            .innerJoin(vendors, eq(orders.vendorId, vendors.id))
            .orderBy(desc(orders.createdAt));

        const formattedOrders = allOrders.map((o) => ({
            id: o.orderCode,
            customer: { name: o.customerName, region: o.customerCity },
            vendor: { name: o.vendorName, id: o.vendorId },
            status: o.status.charAt(0).toUpperCase() + o.status.slice(1).toLowerCase(),
            date: new Date(o.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
            total: `₹${parseFloat(o.totalAmountINR).toLocaleString('en-IN')}`,
            items: Math.floor(Math.random() * 3) + 1, // Placeholder until items count is aggregated
            slaStatus: o.status === "DELAYED" ? "Delayed" : "On Track"
        }));

        return NextResponse.json(formattedOrders);
    } catch (e) {
        console.error("Orders API Error:", e);
        return NextResponse.json({ error: "API Error", details: e instanceof Error ? e.message : String(e) }, { status: 500 });
    }
}
