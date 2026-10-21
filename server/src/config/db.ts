import mongoose from 'mongoose';
import { ENV } from './env.js';

let cachedConn: typeof mongoose | null = null;
let cachedPromise: Promise<typeof mongoose> | null = null;

export const connectDB = async (): Promise<typeof mongoose> => {
  if (cachedConn && mongoose.connection.readyState === 1) {
    return cachedConn;
  }

  if (!cachedPromise) {
    mongoose.set('strictQuery', false);
    cachedPromise = mongoose.connect(ENV.MONGODB_URI, {
      bufferCommands: false,
    }).then((conn) => {
      cachedConn = conn;
      console.log(`[MongoDB] Connected to database: ${conn.connection.name} at ${conn.connection.host}`);
      return conn;
    }).catch((error) => {
      cachedPromise = null;
      console.error('[MongoDB] Connection error:', error);
      throw error;
    });
  }

  return cachedPromise;
};
