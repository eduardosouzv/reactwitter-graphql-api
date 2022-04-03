import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  author: String,
  content: String,
});

export default mongoose.model('Tweet', Schema);
