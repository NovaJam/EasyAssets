import { z } from "zod";
import { SecurityQuestion } from "../types/auth";

export const getSchema = (questions: SecurityQuestion[]) => {
  const shape: Record<string, z.ZodTypeAny> = {};
  questions.forEach((q) => {
    shape[q.id.toString()] = z.string().min(2, "Answer must be at least 2 characters");
  });
  return z.object(shape);
};