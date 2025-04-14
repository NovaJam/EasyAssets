import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export const mongoDbUri = process.env.MONGODB_URI || "undefined";
export const jwtToken = process.env.JWT_SECRET || "undefined";
