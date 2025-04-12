import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { connectDB } from "./lib/connectDB";
import authRoutes from "./routes/authRouter";
import cookieParser from "cookie-parser";
import assets from "./routes/assetsRouter";
const app = express();
const port = 6090;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  console.log("Jinchuriki");
  res.json({ message: "Welcome to the API Of Easy Assets" });
});

app.use("/assets", assets);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  connectDB(process.env.MONGODB_URI as string);
});
