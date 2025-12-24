const { MongoClient } = require("mongodb");
require('dotenv').config();

const uri = process.env.MONGODB_URI || "mongodb+srv://uchihaleader0135_db_user:MTVEO9Zxoz5NEsk1@nexora-cluster.uvzeepx.mongodb.net/?appName=nexora-cluster";

async function checkData() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db("nexora");
        const collection = db.collection("dummy_products");

        const count = await collection.countDocuments();
        console.log(`Total documents in 'dummy_products': ${count}`);

        const docs = await collection.find({}).limit(3).toArray();
        console.log("First 3 documents:");
        console.table(docs, ["name", "price", "currency"]);

    } catch (err) {
        console.error("Error reading data:", err);
    } finally {
        await client.close();
    }
}

checkData();
