const { MongoClient, ObjectId } = require("mongodb");
require('dotenv').config();

const uri = process.env.MONGODB_URI || "mongodb+srv://uchihaleader0135_db_user:MTVEO9Zxoz5NEsk1@nexora-cluster.uvzeepx.mongodb.net/?appName=nexora-cluster";

async function seedCompleteData() {
    console.log("Starting complete database seed...");

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB.");
        const db = client.db("nexora");

        // Clear existing collections
        const collections = ["admins", "vendors", "users", "products", "orders", "shipments", "analytics_snapshots", "activity_logs"];
        for (const col of collections) {
            try {
                await db.collection(col).drop();
                console.log(`Dropped collection: ${col}`);
            } catch (e) {
                // Ignore if collection does not exist
            }
        }

        // --- 1. ADMINS ---
        const adminsData = [
            { name: "Amit Kulkarni", email: "amit.admin@nexora.in", role: "admin", status: "active", createdAt: new Date("2025-01-10T10:30:00Z") },
            { name: "Priya Singh", email: "priya.admin@nexora.in", role: "admin", status: "active", createdAt: new Date("2025-01-12T09:15:00Z") },
            { name: "Rohan Das", email: "rohan.support@nexora.in", role: "admin", status: "active", createdAt: new Date("2025-01-15T14:45:00Z") },
            { name: "Sneha Patel", email: "sneha.ops@nexora.in", role: "admin", status: "active", createdAt: new Date("2025-01-11T11:20:00Z") },
            { name: "Vikram Malhotra", email: "vikram.tech@nexora.in", role: "admin", status: "active", createdAt: new Date("2025-01-05T08:00:00Z") }
        ];
        await db.collection("admins").insertMany(adminsData);
        console.log("Seeded admins.");

        // --- 2. VENDORS (Needed for IDs) ---
        const vendorNames = [
            { name: "Sharma Traders", email: "contact@sharmatraders.in", city: "Pune", state: "Maharashtra" },
            { name: "Luxe Home Decors", email: "sales@luxedecors.in", city: "Mumbai", state: "Maharashtra" },
            { name: "TechGiant Electronics", email: "support@techgiant.in", city: "Bangalore", state: "Karnataka" },
            { name: "Green Earth Organics", email: "info@greenearth.in", city: "Nashik", state: "Maharashtra" },
            { name: "Urban Kicks", email: "hello@urbankicks.in", city: "Delhi", state: "Delhi" }
        ];

        const vendorDocs = vendorNames.map((v, i) => ({
            _id: new ObjectId(),
            vendorName: v.name,
            email: v.email,
            phone: `+91 9${Math.floor(100000000 + Math.random() * 900000000)}`,
            city: v.city,
            state: v.state,
            status: "active",
            fulfillmentRate: parseFloat((85 + Math.random() * 14).toFixed(1)),
            totalOrders: Math.floor(500 + Math.random() * 1500),
            createdAt: new Date(`2024-12-0${i + 1}T09:00:00Z`)
        }));
        await db.collection("vendors").insertMany(vendorDocs);
        console.log("Seeded vendors.");

        // Store vendor IDs for linking
        const vendorIds = vendorDocs.map(v => v._id);

        // --- 3. USERS ---
        const usersData = vendorDocs.map((v, i) => ({
            name: v.vendorName.split(' ')[0] + " Owner",
            email: `owner@${v.vendorName.toLowerCase().replace(/\s/g, '')}.in`,
            role: "vendor",
            vendorId: v._id,
            status: "active",
            createdAt: new Date()
        }));
        // Add an admin user explicitly
        usersData.push({
            name: "Super Admin",
            email: "admin@nexora.in",
            role: "admin",
            vendorId: null,
            status: "active",
            createdAt: new Date()
        });
        await db.collection("users").insertMany(usersData);
        console.log("Seeded users.");

        // --- 4. PRODUCTS ---
        const productTemplates = [
            { name: "Stainless Steel Water Bottle 1L", price: 349, cat: "Home" },
            { name: "Cotton Kurta XL", price: 899, cat: "Fashion" },
            { name: "Wireless Earbuds", price: 1299, cat: "Electronics" },
            { name: "Organic Turmeric Powder 500g", price: 250, cat: "Grocery" },
            { name: "Running Shoes", price: 2499, cat: "Sports" }
        ];

        const productDocs = [];
        vendorIds.forEach((vid, idx) => {
            // Create 2 products per vendor roughly
            productDocs.push({
                vendorId: vid,
                productName: productTemplates[idx].name,
                sku: `NX-${productTemplates[idx].cat.substring(0, 3).toUpperCase()}-00${idx + 1}`,
                priceINR: productTemplates[idx].price,
                stock: Math.floor(Math.random() * 200),
                status: "in_stock",
                createdAt: new Date()
            });
        });
        await db.collection("products").insertMany(productDocs);
        console.log("Seeded products.");

        // --- 5. ORDERS ---
        const orderDocs = [];
        const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

        vendorIds.forEach((vid, i) => {
            // Create 2 orders per vendor
            const orderId1 = `NX-ORD-${10000 + i * 2}`;
            const orderId2 = `NX-ORD-${10000 + i * 2 + 1}`;

            orderDocs.push({
                orderId: orderId1,
                vendorId: vid,
                items: [{ productName: productTemplates[i].name, quantity: 1, priceINR: productTemplates[i].price }],
                totalAmountINR: productTemplates[i].price,
                customerName: `Customer A${i}`,
                customerCity: "Mumbai",
                customerState: "Maharashtra",
                status: statuses[i % 5],
                createdAt: new Date(),
                updatedAt: new Date()
            });

            orderDocs.push({
                orderId: orderId2,
                vendorId: vid,
                items: [{ productName: productTemplates[i].name, quantity: 2, priceINR: productTemplates[i].price }],
                totalAmountINR: productTemplates[i].price * 2,
                customerName: `Customer B${i}`,
                customerCity: "Delhi",
                customerState: "Delhi",
                status: "processing", // forcing some processing for shipment linking
                createdAt: new Date(),
                updatedAt: new Date()
            });
        });

        await db.collection("orders").insertMany(orderDocs);
        console.log("Seeded orders.");

        // --- 6. SHIPMENTS ---
        // Create shipments only for orders that are processing or shipped in our dummy logic
        const shipmentDocs = orderDocs
            .filter(o => ["processing", "shipped", "in_transit"].includes(o.status))
            .map(o => ({
                orderId: o.orderId,
                courier: "Delhivery",
                trackingId: `DLVRY9821${Math.floor(Math.random() * 1000)}`,
                estimatedDelivery: "2025-01-25",
                status: o.status === "processing" ? "ready_to_ship" : "in_transit",
                createdAt: new Date()
            }));
        await db.collection("shipments").insertMany(shipmentDocs);
        console.log("Seeded shipments.");

        // --- 7. ANALYTICS SNAPSHOTS ---
        const analyticsDocs = vendorIds.map(vid => ({
            vendorId: vid,
            date: "2025-01-01",
            totalOrders: Math.floor(Math.random() * 100),
            revenueINR: Math.floor(Math.random() * 50000),
            fulfillmentRate: parseFloat((90 + Math.random() * 10).toFixed(1))
        }));
        await db.collection("analytics_snapshots").insertMany(analyticsDocs);
        console.log("Seeded analytics snapshots.");

        // --- 8. ACTIVITY LOGS ---
        const activityDocs = [
            { type: "ORDER_UPDATE", message: "Order NX-ORD-10000 marked as delivered", createdAt: new Date() },
            { type: "VENDOR_ALERT", message: "Low stock alert for Sharma Traders", createdAt: new Date() },
            { type: "SYSTEM", message: "Daily backup completed", createdAt: new Date() },
            { type: "USER_LOGIN", message: "Admin Amit logged in", createdAt: new Date() },
            { type: "ORDER_NEW", message: "New bulk order received for TechGiant", createdAt: new Date() }
        ];
        await db.collection("activity_logs").insertMany(activityDocs);
        console.log("Seeded activity logs.");

    } catch (err) {
        console.error("Seeding failed:", err);
    } finally {
        await client.close();
        console.log("Database connection closed. Seed complete.");
    }
}

seedCompleteData();
