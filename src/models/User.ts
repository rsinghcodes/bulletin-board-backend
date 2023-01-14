import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  fullname: String,
  password: String,
  email: String,
  createdAt: String,
});

export default model('User', userSchema);
