import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import { connectDB } from './lib/connectDB'

dotenv.config()

const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the API' });
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  connectDB(process.env.MONGODB_URI as string)
});