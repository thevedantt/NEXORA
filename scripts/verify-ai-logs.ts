import 'dotenv/config';
import { db } from '../config/db';
import { aiChatLogs, users } from '../config/schema';
import { eq } from 'drizzle-orm';

async function verify() {
    console.log("🔍 Checking AI Chat Logs...");
    try {
        const allUsers = await db.select().from(users).limit(1);
        if (allUsers.length === 0) {
            console.log("⚠️ No users found to test logging.");
            return;
        }

        const testUser = allUsers[0];
        console.log(`👤 Using test user: ${testUser.name} (${testUser.id})`);

        // Test insertion
        await db.insert(aiChatLogs).values({
            userId: testUser.id,
            role: testUser.role,
            message: "Verify Connection Test",
            response: "Connection verified",
            pageContext: "Migration Test"
        });

        console.log("✅ Successfully wrote a test log!");

        const logs = await db.select().from(aiChatLogs).limit(5);
        console.log(`📊 Current logs in DB: ${logs.length}`);
        logs.forEach((log, i) => {
            console.log(`  [${i}] ${log.message} -> ${log.response?.substring(0, 20)}...`);
        });

    } catch (err) {
        console.error("❌ Database verification failed!");
        console.error(err);
    }
}

verify();
