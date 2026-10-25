import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dawood_equipment';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error: any) {
    console.error(`[MongoDB] Connection error:`, error.message);
    if (error.message?.includes('alert internal error') || error.message?.includes('ssl3_read_bytes')) {
      console.error(`\n========================================================================`);
      console.error(`[MongoDB Atlas Access Required]:`);
      console.error(`Your IP address is not whitelisted in MongoDB Atlas Network Access.`);
      console.error(`1. Go to https://cloud.mongodb.com`);
      console.error(`2. Open "Network Access" in the sidebar`);
      console.error(`3. Click "Add IP Address" -> Select "Allow Access from Anywhere" (0.0.0.0/0)`);
      console.error(`========================================================================\n`);
    }
    process.exit(1);
  }
};
