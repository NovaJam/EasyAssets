import dotenv from 'dotenv';
dotenv.config()
import express, { Request, Response } from 'express';
import { connectDB } from './lib/connectDB'
import authRoutes from './routes/authRouter';
import supportRoutes from './routes/supportRouter';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './swagger';
import morgan = require('morgan');
import { nanoid } from 'nanoid';
const id = nanoid();
console.log(id)
import otpRoutes from "./routes/otpRouter";
import categoryRoutes from "./routes/categoryRouter";
import assets from "./routes/assetsRouter";
import cors from "cors";

const corsOptions = {
  origin: process.env.CORS_ORIGIN, // http://localhost:3000 for development and http://easyassets.vercel.app for production
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const app = express();
const port = process.env.PORT || 5000;
app.use(
  morgan("dev", {
    skip: (req: Request, res: Response) => {
      return req.originalUrl.startsWith("/api-docs");
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions)); // Enable CORS with the specified options

//For API Docs using Swagger UI
setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/assets", assets);

app.get("/", (req: Request, res: Response) => {
  res.json(console.log(req.path));
});

app.get("/api-docs", (req: Request, res: Response) => {
  res.json(console.log("test", req.path));
});

app.use('/api/support', supportRoutes);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger docs at http://localhost:${process.env.PORT}/api-docs`);
  connectDB(process.env.MONGODB_URI as string);
});
