import mongoose from 'mongoose'

export const MongoDBConnection = async (url: string) => {
    try {
        const resp = await mongoose.connect(url, { connectTimeoutMS: 1000, serverSelectionTimeoutMS: 5000 })
        return { message: resp, status: true }
    } catch (err) {
        return { message: err, status: false }
    }
}