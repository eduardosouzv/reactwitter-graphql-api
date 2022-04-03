import mongoose from 'mongoose';

export function connectDatabase() {
  return mongoose.connect('mongodb://localhost:27017/reactwitter');
}
