import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRouter";
import assets from "./routes/assetsRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the API Of Easy Assets" });
});

app.use("/api/auth", authRoutes);
app.use("/api/assets", assets);

export default app;
