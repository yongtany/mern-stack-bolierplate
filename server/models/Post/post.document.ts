import { Document } from 'mongoose';

export default interface PostDocument extends Document {
  writer: String,
  title: String,
  description: String,
  privacy: Number,
  filePath: String,
  category: String,
  views: Number,
  duration: String,
  thumbnail: String,
};