import dotenv from 'dotenv';
dotenv.config()
import express, { Request, Response } from 'express';
import mongoose from 'mongoose'
import { connectDB } from './lib/connectDB'
import authRoutes from './routes/authRouter';
import cookieParser from 'cookie-parser';
import { setupSwagger } from '../swagger';

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//For API Docs using Swagger UI
setupSwagger(app);

app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the API' });
});


app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  console.log('Swagger docs at http://localhost:5000/api-docs');
  connectDB(process.env.MONGODB_URI as string)
});