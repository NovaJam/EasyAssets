import { User } from '../../models/user/userModel';

export const getUsers = () => User.find();
export const getUserByEmail = (email: string) => User.findOne({ email: email });
export const getUserById = (id: string) => User.findById(id);
export const createUser = (values: Record<string, any>) =>
  new User(values).save().then((user) => user.toObject());
export const updateUser = (id: string, values: Record<string, any>) =>
  User.findByIdAndUpdate(id, values, { new: true });
export const deleteUser = (id: string) => User.findByIdAndDelete(id);
