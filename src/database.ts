import 'dotenv/config';
import mongoose from 'mongoose';

export function connectDatabase() {
  return mongoose.connect(process.env.MONGO_URI || '');
}
