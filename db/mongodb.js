const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path: '../.env' });

const uri = process.env.MONGODB_QUERY;

const client = new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1 },
    connectTimeoutMS: 30000, // Timeout de 30 de secunde
    socketTimeoutMS: 30000, // Timeout pentru socket
    maxPoolSize: 10       // Limitează numărul de conexiuni simultane
});

const db = client.db('SI');

async function find(collection, collection1, data) {
    const collection2 = await db.collection(collection);  
    const collection3 = await db.collection(collection1);  
    const result = await collection2.find(data).toArray();
    if (result.length === 0) {
        const result1 = await collection3.find(data).toArray();
        return result1.length === 0 ? { 'finded': false } : {'result':result1, 'type':'derive_unit'};
    }
    return {'result':result , 'type':'base_unit'}
}

async function insert(collection, data) {
    const collection1 = await db.collection(collection);
    await collection1.insertOne(data);
    console.log('Data inserted successfully');
}

async function update(collection, data, data_to_update) {
    const collection1 = await db.collection(collection);
    await collection1.updateOne(data, { $set: data_to_update });
    console.log('Data updated successfully');
}

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Database Successfully Connected');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

connectToDatabase().catch(console.dir);

module.exports = {
    find,
    insert,
    update
};
