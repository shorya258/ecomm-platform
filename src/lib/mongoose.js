import mongoose from "mongoose";
const MONGODB_URI=process.env.MONGODB_URI;
let isConnected = false; // Track the connection status
export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('connected to mongodb');
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}