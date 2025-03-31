import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const uri = process.env.MONGO_URI as string;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
  }
};

export default connectDB;