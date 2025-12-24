import { db } from "@/config/db";
import { products, activityLogs } from "@/config/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { vendorId, name, sku, priceINR, stock, status } = body;

        if (!vendorId) return NextResponse.json({ error: "Missing vendorId" }, { status: 400 });

        const newProduct = await db.insert(products).values({
            vendorId,
            name,
            sku,
            priceINR,
            stock,
            status: status || "IN_STOCK",
        }).returning();

        await db.insert(activityLogs).values({
            type: "STOCK_ALERT",
            message: `New product "${name}" added to inventory with ${stock} units.`,
        });

        return NextResponse.json(newProduct[0], { status: 201 });
    } catch (e) {
        console.error("Product Creation Error:", e);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
