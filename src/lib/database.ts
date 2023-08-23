import mongoose from "mongoose";

const pendingConnection = mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME
});

export const pendingMongoRawClient = pendingConnection.then(mongooseClient => {
    return mongooseClient.connection.getClient();
});


