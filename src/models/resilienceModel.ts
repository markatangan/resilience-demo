import mongoose, { Schema, Document } from 'mongoose';

export interface message extends Document {
  to: string;
  from: string;
  body: string;
}

const MessageSchema: Schema = new Schema({
  to: { type: String, required: true },
  from: { type: String, required: true },
  body: { type: String, required: true },
});

export default mongoose.model<message>('message', MessageSchema);
