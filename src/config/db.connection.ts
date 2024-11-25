import mongoose from "mongoose";

export const MongoDBConnection = async (url: string) => {
    try {
        await mongoose.connect(url, {
            connectTimeoutMS: 1000,
            serverSelectionTimeoutMS: 5000,
        });
        console.log("successfully connected to db")
    } catch (err: any) {
        throw new Error(err.message);
    }
};
