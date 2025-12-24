import { db } from "../config/db";
import { orders } from "../config/schema";
import { eq } from "drizzle-orm";

async function check() {
    const vId = "2c520b33-6589-4c15-92c4-23dbf010651e";
    const orderList = await db.select().from(orders).where(eq(orders.vendorId, vId));
    console.log(`Orders for Vendor ${vId}: ${orderList.length}`);
    orderList.forEach(o => console.log(` - ${o.orderCode} | ${o.status}`));
}

check();
