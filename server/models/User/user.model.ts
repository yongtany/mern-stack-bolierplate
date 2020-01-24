import mongoose, { Model, Schema } from "mongoose";
import UserDocument from './user.document';
import jwt from 'jsonwebtoken';
const config = require("../../config/keys");

export interface UserModel extends Model<UserDocument> {

}

const userSchema = new Schema({
  name: {
    type:String,
    maxlength:50
  },
  email: {
    type:String,
    trim:true,
    unique: 1 
  },
  username: {
      type:String,
      maxlength: 50
  },
  role : {
    type:Number,
    default: 0 
  },
  image: String,
  token : {
    type: String,
  },
  tokenExp :{
    type: Number
  },
  provider: {
    type: String,
    enum: ['LOCAL', 'GOOGLE', 'FACEBOOK']
  }
});

userSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      email: this.email,
      name: this.name,
      username: this.username,
      role: this.role,
      image: this.image
    };
  },

  signToken(user: UserDocument) : String {
    return jwt.sign({
      iss: 'boilerplate',
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() +1) // current time + 1 day ahead
    }, config.JWT_SECRET);
  }
}

export const User: UserModel = mongoose.model<UserDocument, UserModel>("User", userSchema);