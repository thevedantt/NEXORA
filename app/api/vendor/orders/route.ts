import { db } from "@/config/db";
import { orders, activityLogs } from "@/config/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { vendorId, customerName, customerCity, customerState, totalAmountINR, status } = body;

        if (!vendorId) return NextResponse.json({ error: "Missing vendorId" }, { status: 400 });

        const orderCode = `NEX-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`;

        const newOrder = await db.insert(orders).values({
            orderCode,
            vendorId,
            customerName,
            customerCity,
            customerState,
            totalAmountINR,
            status: status || "PENDING",
        }).returning();

        await db.insert(activityLogs).values({
            type: "ORDER_PLACED",
            message: `Manual order ${orderCode} created for ${customerName}. Status: ${status || "PENDING"}.`,
        });

        return NextResponse.json(newOrder[0], { status: 201 });
    } catch (e) {
        console.error("Order Creation Error:", e);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
