import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  getUserByEmail,
  createUser,
} from "../services/User-Services/user.service";

import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const JWT_SECRET = process.env.JWT_SECRET as string; // Log the JWT_SECRET value

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body || {};

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await createUser({
      name,
      email,
      role,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", error: err });
  }
};
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
    return;
  }

  try {
    const user = await getUserByEmail(email).select("+password");
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("sessionToken", token, {
      httpOnly: true,
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(200).json({ success: true, message: "Logged in successfully" });
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(500)
      .json({ success: false, message: "Internal Server error", error: err });
  }
};
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.cookies?.sessionToken) {
      res
        .status(400)
        .json({ success: false, message: "No active session found" });
      return;
    }
    res.clearCookie("sessionToken", {
      httpOnly: true,
      path: "/",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server error", error: err });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      res.status(400).json({
        success: false,
        message: "Please provide email and new password",
      });

      return;
    }
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
