import mongoose from "mongoose";

export const MongoDBConnection = async (url: string): Promise<void> => {
    let ATEMPT = 0;
    let RETRIES = 10;
    let DELAY = 5000;
    let isConnected = false
    while (!isConnected) {
        try {
            await mongoose.connect(url+'k', {
                connectTimeoutMS: 1000,
                serverSelectionTimeoutMS: 5000,
            });
            console.log("successfully connected to db");
            break;
        } catch (err: any) {
            ATEMPT += 1;

            if(ATEMPT>RETRIES){
                throw new Error(err.message);
            }

            await new Promise((res) => setTimeout(res, DELAY));
        }
    }
};
