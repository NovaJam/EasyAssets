import mongoose, { Schema, Document } from 'mongoose';

export interface ISecurityQuestion extends Document {
  question: string;
}

const securityQuestionSchema = new Schema<ISecurityQuestion>({
  question: { type: String, required: true, unique: true },
});

export const SecurityQuestion = mongoose.model<ISecurityQuestion>('SecurityQuestion',securityQuestionSchema);
