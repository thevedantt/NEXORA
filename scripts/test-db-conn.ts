import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

async function test() {
    console.log("🔍 Checking connection to:", process.env.DATABASE_URL?.split('@')[1]);
    const sql = neon(process.env.DATABASE_URL!);

    try {
        console.log("⏳ Sending test query...");
        const result = await sql`SELECT NOW()`;
        console.log("✅ Connection Successful!", result);
    } catch (err) {
        console.error("❌ Connection Failed!");
        console.error(err);
    }
}

test();
