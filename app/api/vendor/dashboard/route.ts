import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { orders, products, vendors } from "@/config/schema";
import { eq, desc, sql, count, sum } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(request: Request) {
    try {
        const user = await currentUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(request.url);
        let vendorId = searchParams.get("vendorId");

        // Logic for Demo/Admin access
        if (!vendorId || vendorId === "null" || vendorId === "undefined" || vendorId === "") {
            const firstVendor = await db.select().from(vendors).limit(1);
            if (firstVendor.length > 0) {
                vendorId = firstVendor[0].id;
            } else {
                return NextResponse.json({ error: "No vendors available in DB" }, { status: 404 });
            }
        }

        // 1. Fetch Aggregated KPI data for ALL orders
        const [totalStats] = await db
            .select({
                totalOrders: count(orders.id),
                totalRevenue: sum(orders.totalAmountINR),
            })
            .from(orders)
            .where(eq(orders.vendorId, vendorId));

        const [pendingStats] = await db
            .select({
                pendingCount: count(orders.id),
            })
            .from(orders)
            .where(sql`${orders.vendorId} = ${vendorId} AND ${orders.status} = 'PENDING'`);

        const [stockAlerts] = await db
            .select({
                alertCount: count(products.id),
            })
            .from(products)
            .where(sql`${products.vendorId} = ${vendorId} AND (${products.status} = 'LOW_STOCK' OR ${products.status} = 'OUT_OF_STOCK')`);

        // 2. Fetch Recent Orders for the table (limit 10)
        const vendorRecentOrders = await db.select()
            .from(orders)
            .where(eq(orders.vendorId, vendorId))
            .orderBy(desc(orders.createdAt))
            .limit(10);

        // 3. Fetch Status Distribution for ALL orders
        const statusDistribution = await db
            .select({
                status: orders.status,
                count: count(orders.id),
            })
            .from(orders)
            .where(eq(orders.vendorId, vendorId))
            .groupBy(orders.status);

        // Format status distribution for UI
        const statusMap = {
            'PENDING': { label: 'Pending', color: 'bg-[#e9c46a]' },
            'PROCESSING': { label: 'Processing', color: 'bg-[#f4a261]' },
            'SHIPPED': { label: 'Shipped', color: 'bg-[#2a9d8f]' },
            'DELIVERED': { label: 'Delivered', color: 'bg-[#606c38]' },
        };

        const statusCounts = Object.entries(statusMap).map(([key, info]) => {
            const row = statusDistribution.find(d => d.status === key);
            return {
                status: info.label,
                count: row ? Number(row.count) : 0,
                colorClass: info.color
            };
        });

        // 4. Construct Final KPIs
        const kpis = [
            {
                title: "Total Orders",
                value: Number(totalStats?.totalOrders || 0).toString(),
                change: "+5%", // These can be dynamic if we have historical snapshots, but keeping trend for UI
                trend: "up",
                iconName: "ShoppingBag"
            },
            {
                title: "Revenue",
                value: `₹${Number(totalStats?.totalRevenue || 0).toLocaleString('en-IN')}`,
                change: "+12%",
                trend: "up",
                iconName: "CreditCard"
            },
            {
                title: "Stock Alert",
                value: Number(stockAlerts?.alertCount || 0).toString(),
                change: "Low stock items",
                trend: "down",
                iconName: "Package"
            },
            {
                title: "Pending Orders",
                value: Number(pendingStats?.pendingCount || 0).toString(),
                change: "Needs attention",
                trend: "neutral",
                iconName: "Clock",
                highlight: true
            },
        ];

        return NextResponse.json({
            kpis,
            orders: vendorRecentOrders.map(o => ({
                id: o.orderCode,
                product: "Nexora Package",
                quantity: 1,
                status: o.status.charAt(0).toUpperCase() + o.status.slice(1).toLowerCase(),
                date: new Date(o.createdAt).toISOString().split('T')[0],
                customer: o.customerName,
                address: `${o.customerCity}, ${o.customerState}`,
                price: `₹${parseFloat(o.totalAmountINR).toLocaleString('en-IN')}`
            })),
            statusCounts
        });
    } catch (e) {
        console.error("❌ Vendor Dashboard API Error:", e);
        return NextResponse.json({ error: "Failed to fetch vendor data", details: String(e) }, { status: 500 });
    }
}
