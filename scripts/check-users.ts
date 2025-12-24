import { db } from "../config/db";
import { users } from "../config/schema";

async function check() {
    const userList = await db.select().from(users);
    console.log(`TOTAL USERS: ${userList.length}`);
    userList.forEach(u => {
        console.log(`- ${u.email} | Role: ${u.role} | VendorID: ${u.vendorId}`);
    });
}
check();
