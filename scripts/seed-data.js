const { MongoClient } = require("mongodb");
require('dotenv').config();

// Use the URI from env or fallback (same as we used in test-db.js)
const uri = process.env.MONGODB_URI || "mongodb+srv://uchihaleader0135_db_user:MTVEO9Zxoz5NEsk1@nexora-cluster.uvzeepx.mongodb.net/?appName=nexora-cluster";

const DUMMY_PRODUCTS = [
    {
        name: "Premium Silk Saree",
        price: 4500,
        currency: "INR",
        category: "Clothing",
        inStock: true
    },
    {
        name: "Handcrafted Clay Pot",
        price: 350,
        currency: "INR",
        category: "Home Decor",
        inStock: true
    },
    {
        name: "Organic Spices Set",
        price: 1200,
        currency: "INR",
        category: "Food",
        inStock: true
    },
    {
        name: "Leather Wallet",
        price: 850,
        currency: "INR",
        category: "Accessories",
        inStock: true
    },
    {
        name: "Wooden Chess Set",
        price: 2500,
        currency: "INR",
        category: "Toys",
        inStock: false
    },
    {
        name: "Jaipuri Bedshseet",
        price: 1800,
        currency: "INR",
        category: "Home Furnishing",
        inStock: true
    }
];

async function seed() {
    console.log("Starting seed process...");
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB.");

        const db = client.db("nexora"); // Explicitly using 'nexora' database
        const collection = db.collection("dummy_products");

        // Clear existing data to avoid duplicates on re-run
        await collection.deleteMany({});
        console.log("Cleared existing dummy data.");

        // Insert new data
        const result = await collection.insertMany(DUMMY_PRODUCTS);
        console.log(`Successfully inserted ${result.insertedCount} dummy products.`);

        console.log("Data sample:");
        console.table(DUMMY_PRODUCTS);

    } catch (err) {
        console.error("Seeding failed:", err);
    } finally {
        await client.close();
        console.log("Connection closed.");
    }
}

seed();
