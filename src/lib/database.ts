import mongoose from "mongoose";
import {MongoClient} from "mongodb";

const pendingConnection = mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME
});
export const pendingRawClient = new MongoClient(process.env.MONGODB_URI).connect();


