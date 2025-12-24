import { db } from "@/config/db";
import { products, orders, activityLogs, vendors } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action, vendorId } = body;

        if (!vendorId) return NextResponse.json({ error: "No vendorId" }, { status: 400 });

        if (action === "ADD_PRODUCT") {
            const newProduct = await db.insert(products).values({
                vendorId: vendorId,
                name: "New Artisan Item " + Math.floor(Math.random() * 100),
                sku: "ART-" + Math.random().toString(36).substring(7).toUpperCase(),
                priceINR: (Math.random() * 2000 + 500).toFixed(2),
                stock: Math.floor(Math.random() * 50) + 10,
                status: "IN_STOCK"
            }).returning();

            await db.insert(activityLogs).values({
                type: "STOCK_ALERT",
                message: `New product ${newProduct[0].name} added to inventory.`
            });

            return NextResponse.json({ success: true, item: newProduct[0] });
        }

        if (action === "CREATE_ORDER") {
            const newOrder = await db.insert(orders).values({
                orderCode: "NX-QUICK-" + Math.floor(Math.random() * 90000 + 10000),
                vendorId: vendorId,
                customerName: "Anonymous Buyer",
                customerCity: "Direct Sale",
                customerState: "IN",
                totalAmountINR: (Math.random() * 5000 + 1000).toFixed(2),
                status: "PENDING"
            }).returning();

            await db.insert(activityLogs).values({
                type: "ORDER_PLACED",
                message: `Quick order ${newOrder[0].orderCode} created successfully.`
            });

            return NextResponse.json({ success: true, item: newOrder[0] });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    } catch (error) {
        console.error("Quick Action Error:", error);
        return NextResponse.json({ error: "Action failed" }, { status: 500 });
    }
}
