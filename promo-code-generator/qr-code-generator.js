// create_qr_for_unused_promo_codes.js

const { MongoClient } = require('mongodb');
const axios = require('axios');
const fs = require('fs');
const env = require('./env');

const mongoUri = env.MONGO_URL;
const dbName = env.MONGO_DB_NAME;
const collectionName = env.MONGO_COLLECTION_NAME;

const accessToken = env.QR_CODE_GENERATOR_ACCESS_TOKEN;
const apiUrl = env.QR_CODE_GENERATOR_URL;

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

// Function to download QR code images for each unused promo code
async function downloadQRCodeImages(promoCodes) {
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

// Main function to handle the workflow
async function main() {
    // Get unused promo codes from MongoDB
    const promoCodes = await getPromoCodes();
    console.log('Unused promo codes:', promoCodes);

    // Download QR code images for each unused promo code
    await downloadQRCodeImages(promoCodes);
}

main();
``
