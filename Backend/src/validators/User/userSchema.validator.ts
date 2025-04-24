import { z } from "zod";

//user selecting and answering security questions during signup
export const userSecurityInfoZodSchema = z.object({
    email:z.string().email(),
    securityQuestion1: z.string().min(1, 'First security question is required'),
    answer1: z.string().min(1, 'Answer to first question is required'),
    securityQuestion2: z.string().min(1, 'Second security question is requried'),
    answer2: z.string().min(1, 'Answer second question is required')
})
    .refine((data) => data.securityQuestion1 !== data.securityQuestion2, {
        message: "Security questions must be different",
        path: ["securityQuestion2"],
    });;

//validate email when requesting the user's security question(during reset)
export const requestSecurityQuestionsZod = z.object({
    email: z.string().email('A valid email is required')
});

//verify user's answers to security questions
export const verifySecurityAnswersZod = z.object({
    email: z.string().email('A valid email is required'),
    answer1: z.string().min(1,'Answer to first question is required'),
    answer2: z.string().min(1,'Answer to first question is required')
});