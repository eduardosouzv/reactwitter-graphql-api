import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  content: String,
});

export default mongoose.model('Tweet', Schema);
