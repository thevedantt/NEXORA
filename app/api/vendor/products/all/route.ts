import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { products, vendors } from "@/config/schema";
import { eq, desc } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(request: Request) {
    console.log("📦 Fetching all vendor products...");
    try {
        const user = await currentUser();
        if (!user) {
            console.log("❌ Unauthorized access attempt");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        let vendorId = searchParams.get("vendorId");
        console.log(`🔍 Received vendorId: ${vendorId}`);

        // Handle cases where vendorId is not provided or invalid
        if (!vendorId || vendorId === "null" || vendorId === "undefined" || vendorId === "") {
            console.log("⚠️ No vendorId provided, attempting fallback...");
            const firstVendor = await db.select().from(vendors).limit(1);
            if (firstVendor.length > 0) {
                vendorId = firstVendor[0].id;
                console.log(`✅ Using fallback vendorId: ${vendorId}`);
            } else {
                console.log("❌ No vendors found in DB for fallback");
                return NextResponse.json({ error: "No vendors available" }, { status: 404 });
            }
        }

        // Fetch ALL products for this vendor
        console.log(`📥 Querying database for products of vendor: ${vendorId}`);
        const allProducts = await db.select()
            .from(products)
            .where(eq(products.vendorId, vendorId))
            .orderBy(desc(products.createdAt));

        console.log(`✅ Found ${allProducts.length} products`);

        return NextResponse.json(allProducts.map(p => ({
            id: p.id,
            name: p.name,
            sku: p.sku,
            price: `₹${parseFloat(p.priceINR).toLocaleString('en-IN')}`,
            stock: p.stock,
            status: p.status === "IN_STOCK" ? "In Stock" : p.status === "LOW_STOCK" ? "Low Stock" : "Out of Stock"
        })));
    } catch (e) {
        console.error("❌ Vendor Products API Error:", e);
        return NextResponse.json({ error: "Failed to fetch products", details: String(e) }, { status: 500 });
    }
}
