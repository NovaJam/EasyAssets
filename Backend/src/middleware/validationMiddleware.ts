import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

import { STATUS_CODES } from "http";

export function validateData(schema: z.ZodSchema<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      console.log("Validation successful");
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(300).json({
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.log("Validation error");
      next(error);
    }
  };
}
