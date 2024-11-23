import mongoose from 'mongoose'

export const MongoDBConnection = async (url: string) => {
    mongoose.connect(url, { connectTimeoutMS: 1000, serverSelectionTimeoutMS: 5000 })
        .then(res => { return { message: res, status: true } })
        .catch(rej => { return { message: rej, status: false } })
}