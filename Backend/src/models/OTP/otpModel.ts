import mongoose, { Document, Model, Schema } from 'mongoose';

interface IOtp extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const otpSchema: Schema<IOtp> = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 },
});

const OtpModel: Model<IOtp> = mongoose.model<IOtp>('Otp', otpSchema);

export default OtpModel;
