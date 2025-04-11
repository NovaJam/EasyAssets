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

export const getUsers = () => User.find();
export const getUserByEmail = (email: string) => User.findOne({email: email});
export const getUserById = (id: string) => User.findById(id);
export const createUser = (values: Record<string, any>) => new User(values).save().then((user) => user.toObject());
export const updateUser = (id: string, values: Record<string, any>) => User.findByIdAndUpdate(id, values, { new: true });
export const deleteUser = (id: string) => User.findByIdAndDelete(id);

