const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');
async function list() {
    const db = getDb();
    const products = await db.collection('products').find({}).toArray();
    return products;
}
async function add(_, { product }) {
    const db = getDb();
    const newProduct = { ...product };
    newProduct.id = await getNextSequence('products');
    const result = await db.collection('products').insertOne(newProduct);
    const savedProducts = await db.collection('products').findOne({ _id: result.insertedId });
    return savedProducts;
}
module.exports = { list, add };
  