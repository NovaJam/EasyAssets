declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

import { NextFunction, Request, Response, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const checkSessionToken: RequestHandler = async (req:Request, res:Response, next:NextFunction) => {
  const token = req.cookies?.sessionToken;

  if (!token) {
    res.status(401).json({ message: "No session token provided" });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");

    const decoded = jwt.verify(token, secret) as JwtPayload & { id: string; role: string };

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token",
      error: (error as Error).message,
    });
  }
};
