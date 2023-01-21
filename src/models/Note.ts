import { Schema, model, Document } from 'mongoose';

const noteSchema = new Schema({
  content: String,
  color: String,
  defaultPos: {
    x: Number,
    y: Number,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  createdAt: String,
});

export interface NoteDoc extends Document {
  content: string;
  color: string;
  defaultPos: {
    x: string;
    y: string;
  };
  userId: string;
  createdAt: string;
}

export default model('Note', noteSchema);
