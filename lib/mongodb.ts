import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Define the type for our cached mongoose connection
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Declare global variable for caching
declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseCache;
}

// Initialize the cached connection
if (!global.mongoose) {
    global.mongoose = {
        conn: null,
        promise: null
    };
}

const cached = global.mongoose;

export async function connectToDb() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI!, opts)
            .then((mongoose) => {
                console.log('Connected to MongoDB');
                return mongoose;
            })
            .catch((error) => {
                console.error('MongoDB connection error:', error);
                cached.promise = null;
                throw error;
            });
    }
    cached.conn = await cached.promise;
    return cached.conn;
} 