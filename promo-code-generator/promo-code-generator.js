const { MongoClient } = require('mongodb');
const axios = require('axios');
const fs = require('fs');
const env = require('./env');


const mongoUri = env.MONGO_URL;

const dbName = env.MONGO_DB_NAME;
const collectionName = env.MONGO_COLLECTION_NAME;

const accessToken = env.QR_CODE_GENERATOR_ACCESS_TOKEN;
const apiUrl = env.QR_CODE_GENERATOR_URL;

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

// Function to retrieve unused promo codes from MongoDB collection
async function getPromoCodes() {
    const client = new MongoClient(mongoUri, { useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Only select promo codes that are not used
        const promoCodesCursor = collection.find({ isUsed: false }, { projection: { promoCode: 1, _id: 0 } });
        const promoCodesArray = await promoCodesCursor.toArray();
        
        return promoCodesArray.map(doc => doc.promoCode);
    } catch (error) {
        console.error('Error retrieving promo codes:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

// Main function to handle the workflow
async function main() {
    // Insert new promo codes into MongoDB - adjust the number as needed
    await insertPromoCodes(10); // For example, insert 10 new promo codes

    // Get unused promo codes from MongoDB
    const promoCodes = await getPromoCodes();
    console.log('Unused promo codes:', promoCodes);

    // Download QR code images for each unused promo code
    const promoCodesFolder = 'promo_codes';
    
    // Ensure the "promo codes" folder exists
    if (!fs.existsSync(promoCodesFolder)) {
        fs.mkdirSync(promoCodesFolder);
    }

    promoCodes.forEach(promoCode => {
        const requestData = {
            frame_name: 'no-frame',
            qr_code_text: `https://rarelygroovy.com/create-user?promoCode=${promoCode}`,
            image_format: 'JPG'
        };
    
        axios.post(apiUrl + '?access-token=' + accessToken, requestData, { responseType: 'stream' })
            .then(response => {
                const fileName = `${promoCodesFolder}/qr_code_${promoCode.replace(/[^\w]/g, '_')}.jpg`;
                const fileStream = fs.createWriteStream(fileName);
                response.data.pipe(fileStream);
                fileStream.on('finish', () => {
                    console.log(`QR code image saved successfully for promo code: ${promoCode}`);
                });
            })
            .catch(error => {
                console.error(`Error fetching QR code for promo code: ${promoCode}`, error);
            });
    });
}

// Run the main function
main();
