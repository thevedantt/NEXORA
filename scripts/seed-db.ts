import { db } from "../config/db";
import {
    vendors, products, orders, orderItems,
    analyticsSnapshots, activityLogs
} from "../config/schema";

async function seed() {
    console.log("🌱 Starting seeding...");

    try {
        // 1. Seed Vendors
        console.log("Inserting vendors...");
        const insertedVendors = await db.insert(vendors).values([
            {
                vendorName: "Patel Enterprise",
                email: "contact@patel.in",
                phone: "9876543210",
                city: "Ahmedabad",
                state: "Gujarat",
                status: "ACTIVE",
                fulfillmentRate: "98.50",
                totalOrders: 145,
            },
            {
                vendorName: "Sharma Logistics",
                email: "sharma@supply.in",
                phone: "9876543211",
                city: "Delhi",
                state: "Delhi",
                status: "ACTIVE",
                fulfillmentRate: "92.00",
                totalOrders: 89,
            },
            {
                vendorName: "Reddy Organics",
                email: "hello@reddy.com",
                phone: "9876543212",
                city: "Hyderabad",
                state: "Telangana",
                status: "PENDING",
                fulfillmentRate: "0.00",
                totalOrders: 0,
            },
            {
                vendorName: "Malhotra Spices",
                email: "sales@malhotra.in",
                phone: "9876543213",
                city: "Amritsar",
                state: "Punjab",
                status: "ACTIVE",
                fulfillmentRate: "95.20",
                totalOrders: 230,
            },
            {
                vendorName: "Kolkata Crafts",
                email: "art@kolkata.in",
                phone: "9876543214",
                city: "Kolkata",
                state: "West Bengal",
                status: "PAUSED",
                fulfillmentRate: "88.00",
                totalOrders: 54,
            }
        ]).returning();

        const v1Id = insertedVendors[0].id;
        const v2Id = insertedVendors[1].id;
        const v4Id = insertedVendors[3].id;

        // 2. Seed Products
        console.log("Inserting products...");
        const insertedProducts = await db.insert(products).values([
            {
                vendorId: v1Id,
                name: "Premium Cotton Saree",
                sku: "SAR-001",
                priceINR: "2499.00",
                stock: 45,
                status: "IN_STOCK",
            },
            {
                vendorId: v1Id,
                name: "Handwoven Scarf",
                sku: "SAR-002",
                priceINR: "899.00",
                stock: 120,
                status: "IN_STOCK",
            },
            {
                vendorId: v2Id,
                name: "Industrial Safety Gloves",
                sku: "IND-G01",
                priceINR: "450.00",
                stock: 500,
                status: "IN_STOCK",
            },
            {
                vendorId: v4Id,
                name: "Organic Turmeric Powder",
                sku: "SPI-T01",
                priceINR: "199.00",
                stock: 0,
                status: "OUT_OF_STOCK",
            },
            {
                vendorId: v4Id,
                name: "Kashmiri Chili 500g",
                sku: "SPI-C01",
                priceINR: "350.00",
                stock: 8,
                status: "LOW_STOCK",
            }
        ]).returning();

        // 3. Seed Orders
        console.log("Inserting orders...");
        const insertedOrders = await db.insert(orders).values([
            {
                orderCode: "NEX-1001",
                vendorId: v1Id,
                customerName: "Anjali Gupta",
                customerCity: "Mumbai",
                customerState: "Maharashtra",
                totalAmountINR: "5897.00",
                status: "PROCESSING",
            },
            {
                orderCode: "NEX-1002",
                vendorId: v2Id,
                customerName: "Rahul Verma",
                customerCity: "Bangalore",
                customerState: "Karnataka",
                totalAmountINR: "12500.00",
                status: "SHIPPED",
            },
            {
                orderCode: "NEX-1003",
                vendorId: v1Id,
                customerName: "Siddharth Das",
                customerCity: "Pune",
                customerState: "Maharashtra",
                totalAmountINR: "2499.00",
                status: "DELIVERED",
            },
            {
                orderCode: "NEX-1004",
                vendorId: v4Id,
                customerName: "Priya Menon",
                customerCity: "Kochi",
                customerState: "Kerala",
                totalAmountINR: "750.00",
                status: "PENDING",
            },
            {
                orderCode: "NEX-1005",
                vendorId: v2Id,
                customerName: "Vikram Singh",
                customerCity: "Jaipur",
                customerState: "Rajasthan",
                totalAmountINR: "4000.00",
                status: "DELAYED",
            }
        ]).returning();

        // 4. Seed Order Items
        console.log("Inserting order items...");
        await db.insert(orderItems).values([
            {
                orderId: insertedOrders[0].id,
                productName: "Premium Cotton Saree",
                quantity: 2,
                priceINR: "2499.00",
            },
            {
                orderId: insertedOrders[1].id,
                productName: "Industrial Safety Gloves",
                quantity: 25,
                priceINR: "450.00",
            },
            {
                orderId: insertedOrders[2].id,
                productName: "Premium Cotton Saree",
                quantity: 1,
                priceINR: "2499.00",
            },
            {
                orderId: insertedOrders[3].id,
                productName: "Kashmiri Chili 500g",
                quantity: 2,
                priceINR: "350.00",
            },
            {
                orderId: insertedOrders[4].id,
                productName: "Industrial Safety Gloves",
                quantity: 8,
                priceINR: "450.00",
            }
        ]);

        // 5. Seed Analytics Snapshots
        console.log("Inserting analytics snapshots...");
        await db.insert(analyticsSnapshots).values([
            {
                vendorId: v1Id,
                date: new Date(),
                totalOrders: 12,
                revenueINR: "45000.00",
                fulfillmentRate: "99.00",
            },
            {
                vendorId: v2Id,
                date: new Date(),
                totalOrders: 8,
                revenueINR: "22000.00",
                fulfillmentRate: "90.50",
            },
            {
                vendorId: v4Id,
                date: new Date(),
                totalOrders: 5,
                revenueINR: "1500.00",
                fulfillmentRate: "94.00",
            },
            {
                vendorId: v1Id,
                date: new Date(Date.now() - 86400000), // Yesterday
                totalOrders: 15,
                revenueINR: "52000.00",
                fulfillmentRate: "98.00",
            },
            {
                vendorId: v2Id,
                date: new Date(Date.now() - 86400000),
                totalOrders: 4,
                revenueINR: "10000.00",
                fulfillmentRate: "85.00",
            }
        ]);

        // 6. Seed Activity Logs
        console.log("Inserting activity logs...");
        await db.insert(activityLogs).values([
            {
                type: "ORDER_PLACED",
                message: "New order NEX-1004 received for Malhotra Spices",
            },
            {
                type: "ORDER_SHIPPED",
                message: "Order NEX-1002 has been dispatched via BlueDart",
            },
            {
                type: "VENDOR_ACTIVE",
                message: "Patel Enterprise has completed their verification",
            },
            {
                type: "STOCK_ALERT",
                message: "Kashmiri Chili 500g is running low (8 items left)",
            },
            {
                type: "REVENUE_MILESTONE",
                message: "Patel Enterprise reached ₹50,000 in monthly sales",
            }
        ]);

        console.log("✅ Seeding completed successfully!");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
    }
}

seed();
