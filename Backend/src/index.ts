import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./lib/connectDB";
import { Schema, model } from "mongoose";

import assets from "./routes/assetsRouter";

dotenv.config();

const app = express();
const port = 6090;

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  console.log("Jinchuriki");
  res.json({ message: "Welcome to the API Of Easy Assets" });
});

app.use("/assets", assets);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  connectDB(process.env.MONGODB_URI as string);
});
