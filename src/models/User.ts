import { Schema, model, Document } from 'mongoose';

const userSchema = new Schema({
  fullname: String,
  email: String,
  password: String,
  createdAt: String,
});

export interface UserDoc extends Document {
  fullname: string;
  email: string;
  password: string;
  createdAt: string;
}

export default model<UserDoc>('User', userSchema);
