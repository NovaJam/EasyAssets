import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const email = process.env.EMAIL;
const emailPassword = process.env.EMAIL_PASSWORD;

if (!email || !emailPassword) {
  throw new Error('EMAIL or EMAIL_PASSWORD is not defined in environment variables');
}

export const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: emailPassword,
  },
});
