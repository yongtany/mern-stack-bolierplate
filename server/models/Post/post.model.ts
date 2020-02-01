import mongoose, { Schema } from "mongoose";
import PostDocument from './post.document';


const postSchema = new Schema({
  writer: {
    type:Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
      type:String,
      maxlength:50,
  },
  description: {
      type: String,
  },
  privacy: {
      type: Number,
  },
  filePath : {
      type: String,
  },
  category: String,
  views : {
      type: Number,
      default: 0 
  },
  duration :{
      type: String
  },
  thumbnail: {
      type: String
  }
  }, { timestamps: true })


export const Post = mongoose.model<PostDocument>("Post", postSchema);