import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { aiChatLogs, orders, products, vendors, activityLogs } from "@/config/schema";
import { eq, count, sum, sql, desc } from "drizzle-orm";

async function getContextWithRetry(context: any, attempt = 1): Promise<string> {
    try {
        let dbExtraContext = "";

        if (context.userRole === "VENDOR" && context.vendorId) {
            const vendorProfiles = await db.select().from(vendors).where(eq(vendors.id, context.vendorId)).limit(1);
            const vendorProfile = vendorProfiles[0];

            const [orderStats] = await db.select({
                total: count(orders.id),
                revenue: sum(orders.totalAmountINR)
            }).from(orders).where(eq(orders.vendorId, context.vendorId));

            const lowStock = await db.select().from(products)
                .where(sql`${products.vendorId} = ${context.vendorId} AND ${products.status} != 'IN_STOCK'`)
                .limit(5);

            const topProducts = await db.select().from(products)
                .where(eq(products.vendorId, context.vendorId))
                .orderBy(desc(products.stock))
                .limit(3);

            const recentActivities = await db.select().from(activityLogs)
                .orderBy(desc(activityLogs.createdAt))
                .limit(5);

            dbExtraContext = `
            Store Details:
            - Name: ${vendorProfile?.vendorName || "Active Store"}
            - Location: ${vendorProfile?.city || "Unknown"}, ${vendorProfile?.state || "Unknown"}
            
            Database Stats:
            - Total Orders: ${orderStats?.total || 0}
            - Total Revenue: ₹${orderStats?.revenue || 0}
            - Inventory Snapshot: ${topProducts.map((p: any) => `${p.name} (Qty: ${p.stock})`).join(", ")}
            - Low Stock Alert: ${lowStock.length > 0 ? lowStock.map((p: any) => p.name).join(", ") : "All good"}
            
            Recent Activity:
            ${recentActivities.map(a => `- ${a.message}`).join("\n")}
            `;
        } else if (context.userRole === "ADMIN") {
            const [globalOrders] = await db.select({ total: count(orders.id) }).from(orders);
            const [globalVendors] = await db.select({ total: count(vendors.id) }).from(vendors);

            dbExtraContext = `
            Global Marketplace Stats:
            - Total Registered Vendors: ${globalVendors?.total || 0}
            - Total Orders processed: ${globalOrders?.total || 0}
            `;
        }
        return dbExtraContext;
    } catch (error: any) {
        if (attempt < 3 && (error.code === 'ENOTFOUND' || error.message.includes('fetch failed') || error.message.includes('timeout'))) {
            console.log(`⚠️ AI context fetch attempt ${attempt} failed. Retrying...`);
            await new Promise(r => setTimeout(r, 1000 * attempt));
            return getContextWithRetry(context, attempt + 1);
        }
        console.warn("🛡️ AI Safety: DB Context unavailable, falling back.");
        return "Note: Real-time database context is temporarily unavailable. Proceed with general knowledge.";
    }
}

export async function POST(req: Request) {
    try {
        const { messages, context, userId } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
        }

        // Fetch context with the same retry logic as our data routes
        const dbExtraContext = await getContextWithRetry(context);

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const systemInstruction = `
        You are NexoAI, the intelligent heart of the Nexora Marketplace.
        Role: ${context.userRole}
        Current Page: ${context.pageName || "General Tool"}
        
        Real-time Database Context:
        ${dbExtraContext}

        Mission:
        Assist the user with professional, operational, and proactive advice. 
        If you see low stock, suggest restocking. If revenue is up, congratulate them.
        Keep it concise. Always reference real data when available.
        `;

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: systemInstruction }] },
                { role: "model", parts: [{ text: "NexoAI system initialized. Ready to assist with Nexora operations." }] },
                ...messages.slice(0, -1).map((m: any) => ({
                    role: m.role === "user" ? "user" : "model",
                    parts: [{ text: m.content }],
                })),
            ],
        });

        const lastMessage = messages[messages.length - 1].content;
        const result = await chat.sendMessage(lastMessage);
        const text = result.response.text();

        // 2. Log this interaction to DB
        if (userId) {
            // FIRE AND FORGET LOGGING to avoid blocking user response
            // We use .catch to log errors but don't await the insertion delay
            // DB Log initiation
            // db.insert(aiChatLogs)...
            db.insert(aiChatLogs).values({
                userId: userId,
                role: context.userRole || "UNKNOWN",
                message: lastMessage,
                response: text,
                pageContext: context.pageName || "NexoAI Tool"
            }).catch(e => console.error("❌ Failed to buffer log:", e));
        }

        return NextResponse.json({ content: text });
    } catch (error: any) {
        console.error("AI Error:", error);

        if (error.code === 'ENOTFOUND' || error.message.includes('fetch failed') || error.message.includes('timeout')) {
            return NextResponse.json({
                error: "DATABASE_CONNECTION_ERROR",
                details: "We're having trouble connecting to the database. Please try again in 1 minute."
            }, { status: 500 });
        }

        return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 });
    }
}
