import mongoose from "mongoose";

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI;

// Cache the MongoDB connection and promise
const cached = (global as any).mongoose || { conn: null, promise: null };

/**
 * Connect to the MongoDB database.
 * @returns {Promise<mongoose.Connection>} The MongoDB connection.
 * @throws {Error} Throws an error if MONGODB_URI is missing.
 */
export const connectToDatabase = async () => {
    // If connection is already established, return it
    if (cached.conn) return cached.conn;

    // Throw an error if MONGODB_URI is missing
    if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');

    // Establish connection to MongoDB
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'eventlly', // Specify the name of the database
        bufferCommands: false, // Disable command buffering
    });

    // Cache the connection and return it
    cached.conn = await cached.promise;
    return cached.conn;
}
