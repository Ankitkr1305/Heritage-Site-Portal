import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/heritage_crowd_db';
let cached = global.mongooseCache || {
    conn: null,
    promise: null,
    isConnected: false,
};
if (!global.mongooseCache) {
    global.mongooseCache = cached;
}
export async function connectToDatabase() {
    if (cached.conn) {
        return { conn: cached.conn, isConnected: cached.isConnected };
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 2000, // Quick timeout to fallback gracefully
        };
        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((m) => {
            cached.isConnected = true;
            console.log(' Successfully connected to MongoDB');
            return m;
        })
            .catch((err) => {
            cached.isConnected = false;
            console.warn('⚠️ MongoDB connection not available, using in-memory store fallback:', err.message);
            return null;
        });
    }
    try {
        cached.conn = await cached.promise;
    }
    catch (e) {
        cached.promise = null;
        cached.isConnected = false;
    }
    return { conn: cached.conn, isConnected: cached.isConnected };
}
