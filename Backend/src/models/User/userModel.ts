import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Support';
  organization: string;
  password: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { 
    type: String, 
    required: [true, 'Must enter name'], trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true, match: [
    /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
    'Please fill a valid email address',
  ], },
  role: { type: String, enum: ['Admin', 'User', 'Support'], default: 'User' },
  organization: { type: String, default: 'null' },
  password: { type: String, required: [true, 'Must provide a password'], select: false, trim: true, minlength: 6 },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>('User', userSchema);