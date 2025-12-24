import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { vendors } from "@/config/schema";
import { desc } from "drizzle-orm";

export async function GET() {
    try {
        const allVendors = await db.select()
            .from(vendors)
            .orderBy(desc(vendors.createdAt));

        return NextResponse.json(allVendors.map((v) => ({
            id: v.id,
            name: v.vendorName,
            email: v.email,
            status: v.status ? v.status.charAt(0).toUpperCase() + v.status.slice(1).toLowerCase() : "Pending",
            fulfillmentRate: parseFloat(v.fulfillmentRate || "0"),
            totalOrders: v.totalOrders || 0,
            revenue: "₹" + (Math.random() * 200000 + 50000).toFixed(0),
            joinedDate: v.createdAt ? new Date(v.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : "Recently",
            products: Math.floor(Math.random() * 20) + 5
        })));
    } catch (e) {
        console.error("Vendors API Error Details:", e);
        return NextResponse.json({
            error: "Failed to load vendors",
            details: e instanceof Error ? e.message : "Database connection timeout"
        }, { status: 500 });
    }
}
