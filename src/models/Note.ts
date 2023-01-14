import { Schema, model } from 'mongoose';

const noteSchema = new Schema({
  content: String,
  color: String,
  defaultPos: {
    x: String,
    y: String,
  },
});

export default model('Note', noteSchema);
