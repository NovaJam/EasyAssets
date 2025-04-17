import { z } from 'zod';

export type Role = "Admin" | "User";

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: Role;
  };
};

export type SignupData = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: Role;
  organisation_name?: string;
};

export type SecurityQuestion = {
  id: number;
  question: string;
};

export type SecurityQuestionAnswer = {
  question: string;
  answer: string;
};

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export type ResetPasswordRequest = {
  email: string;
  newPassword: string;
};
