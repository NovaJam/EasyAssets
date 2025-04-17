import { Request, Response } from 'express';
import Otp from '../models/OTP/otpModel';
import { transporter } from '../lib/mailer';

export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  if (!email) 
    {
        res.status(400).json({ error: 'Email is required' });
        return;
    }

  const otp = generateOTP();
  await Otp.create({ email, otp });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}`,
    });
    res.status(200).json({ message: 'OTP sent successfully' });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error'});
    return;
  }
};
export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;
  
    const record = await Otp.findOne({ email, otp });
    if (!record){
        res.status(400).json({ error: 'Invalid or expired OTP' });
        return;
    }
    await Otp.deleteMany({ email });
    res.status(200).json({ message: 'OTP verified successfully' });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error'});
    return;
  }
};