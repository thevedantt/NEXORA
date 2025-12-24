import { db } from "../config/db";
import { products, orders } from "../config/schema";
import { eq, count, sum, sql } from "drizzle-orm";

async function check() {
    const vId = "2c520b33-6589-4c15-92c4-23dbf010651e";

    const [stats] = await db.select({
        orders: count(orders.id),
        revenue: sum(orders.totalAmountINR)
    }).from(orders).where(eq(orders.vendorId, vId));

    const [alerts] = await db.select({
        count: count(products.id)
    }).from(products).where(sql`${products.vendorId} = ${vId} AND (${products.status} = 'LOW_STOCK' OR ${products.status} = 'OUT_OF_STOCK')`);

    console.log(`\n--- VENDOR STATS FOR ${vId} ---`);
    console.log(`Total Orders: ${stats.orders}`);
    console.log(`Total Revenue: ₹${stats.revenue || 0}`);
    console.log(`Stock Alerts: ${alerts.count}`);
}

check();
