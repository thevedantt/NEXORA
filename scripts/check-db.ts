import { db } from "../config/db";
import { users, vendors } from "../config/schema";

async function check() {
    try {
        const userList = await db.select().from(users);
        const vendorList = await db.select().from(vendors);

        console.log(`\n=== DATABASE DIAGNOSTICS ===`);
        console.log(`TOTAL USERS: ${userList.length}`);
        userList.forEach(u => {
            console.log(`- Email: ${u.email}`);
            console.log(`  Role: ${u.role}`);
            console.log(`  VendorID: ${u.vendorId || "NULL"}`);
            console.log(`  ClerkID: ${u.clerkUserId}`);
            console.log(`-------------------------`);
        });

        console.log(`\nTOTAL VENDORS: ${vendorList.length}`);
        vendorList.forEach(v => {
            console.log(`- Vendor Name: ${v.vendorName}`);
            console.log(`  Email: ${v.email}`);
            console.log(`  Status: ${v.status}`);
            console.log(`-------------------------`);
        });
    } catch (err) {
        console.error("Diagnostic failed:", err);
    }
}

check();
