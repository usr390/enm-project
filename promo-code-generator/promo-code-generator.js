const { MongoClient } = require('mongodb');
const env = require('./env');

const mongoUri = env.MONGO_URL;
const dbName = env.MONGO_DB_NAME;
const collectionName = env.MONGO_COLLECTION_NAME;

// Function to generate a single promo code
function generatePromoCode() {
    return [...Array(16)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

// Function to insert a specified number of promo codes into MongoDB
async function insertPromoCodes(count) {
    const client = new MongoClient(mongoUri, { useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('Connected to MongoDB to insert promo codes');

        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const promoCodes = [...Array(count)].map(() => ({
            promoCode: generatePromoCode(),
            isUsed: false,
            userId: null,
            activatedAt: null,
            expiresAt: null
        }));

        await collection.insertMany(promoCodes);
        console.log(`${count} promo codes inserted.`);
    } catch (error) {
        console.error('Error inserting promo codes:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB after insert');
    }
}

// Run the function to insert promo codes
async function main() {
    await insertPromoCodes(10); // Adjust the number as needed
}

main();
