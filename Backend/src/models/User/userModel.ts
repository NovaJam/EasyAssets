import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'Admin' | 'User';
  organization: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
  organization: { type: String },
  password: { type: String, required: true, select: false },
});

export const User = mongoose.model<IUser>('User', userSchema);