import mongoose from "mongoose";

export const MongoDBConnection = async (url: string): Promise<void> => {
    let ATTEMPT = 0;
    let RETRIES = 10;
    let DELAY = 5000;
    let isConnected = false;
    while (!isConnected) {
        try {
            await mongoose.connect(url, {
                connectTimeoutMS: 1000,
                serverSelectionTimeoutMS: 5000,
            });
            console.log("successfully connected to db");
            isConnected = true
            break;
        } catch (err: any) {
            ATTEMPT += 1;

            console.log(`failed to connect to mongodb retrying in 5s => ${ATTEMPT}th attempt`)

            if (ATTEMPT > RETRIES) {
                throw new Error(err.message);
            }

            await new Promise((res) => setTimeout(res, DELAY));
        }
    }
};
