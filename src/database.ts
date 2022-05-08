import 'dotenv/config';
import mongoose from 'mongoose';

export function connectDatabase() {
  const MONGO_URI = process.env.MONGO_URI || '';
  const SCHEMA = process.env.SCHEMA || '';

  if (process.env.NODE_ENV === 'TEST') {
    return mongoose.connect(MONGO_URI + 'test_database');
  }

  console.log(`used schema: ${SCHEMA}`);
  return mongoose.connect(MONGO_URI + SCHEMA);
}
