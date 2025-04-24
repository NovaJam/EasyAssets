import { Request, Response } from "express";
import { userSecurityInfoZodSchema, requestSecurityQuestionsZod, verifySecurityAnswersZod } from '../validators/User/userSchema.validator';
import { 
  //deleteUserSecurityInfo, 
  getUserSecurityQuestionsService, saveUserSecurityInfoService, verifySecurityAnswersService } from "../services/User-Services/userSecurityInfo.service";
import bcrypt from 'bcrypt';
import { getAllQuestions } from "../services/User-Services/securityQuestions.service";

//User Selected questions and answered during signUp
export const saveUserSecurityInfo = async (req: Request, res: Response) => {
  try {
    const parsed = userSecurityInfoZodSchema.safeParse(req?.body);

    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.flatten() });
      return;
    }

    const userEmail = parsed?.data?.email;

    console.log("valid UserId? ==>",userEmail);
    
    if (!userEmail) {
      res.status(401).json({ message: 'Unauthorized: User ID missing from session' });
    }

    const {
      securityQuestion1,
      answer1,
      securityQuestion2,
      answer2,
    } = parsed.data;

    // Ensure questions are not the same
    if (securityQuestion1 === securityQuestion2) {
      res.status(400).json({
        message: "Security questions must be different",
      });
      return;
    }

    // Validate selected questions against DB
    const allQuestions = await getAllQuestions();
    const validQuestions = allQuestions.map((q) => q.question);

    if (
      !validQuestions.includes(securityQuestion1) ||
      !validQuestions.includes(securityQuestion2)
    ) {
      res.status(400).json({
        message: "One or both selected security questions are invalid",
      });
      return;
    }

    const hashedAnswer1 = await bcrypt.hash(answer1.toLowerCase(), 10);
    const hashedAnswer2 = await bcrypt.hash(answer2.toLowerCase(), 10);

    const SaveData = {
      securityQuestion1,
      answer1: hashedAnswer1,
      securityQuestion2,
      answer2: hashedAnswer2,
    };

    await saveUserSecurityInfoService(userEmail, SaveData);

    res.status(201).json({ message: "Security questions saved successfully" });
    return;
  } catch (err) {
    console.error("Error saving user security info:", err);
    res.status(500).json({ message: "Failed to save security info" });
    return;
  }
};

//Ask same questions that are selected by user
export const getUserSecurityQuestions = async (req: Request, res: Response) => {
    try {
        const parsed = requestSecurityQuestionsZod.safeParse(req?.body);
        if (!parsed.success) {
            res.status(400).json({ errors: parsed.error.flatten() });
            return;
        }
        const { email } = parsed.data;
        const userQuestions = await getUserSecurityQuestionsService(email);

        if (!userQuestions) {
            res.status(404).json({ message: 'User or security questions not found' });
            return;
        }
        res.status(200).json({
            securityQuestion1: userQuestions.securityQuestion1,
            securityQuestion2: userQuestions.securityQuestion2
        });
        return;

    } catch (err) {
        console.error('Error getting user security questions:', err);
        res.status(500).json({ message: 'Failed to retrieve security questions' });
        return;
    }
}

//Verify if the answers are matched respectively to questions
export const verifySecurityAnswers = async (req: Request, res: Response) => {
    try {
        const parsed = verifySecurityAnswersZod.safeParse(req?.body);
        if (!parsed.success) {
            res.status(400).json({ errors: parsed.error.flatten() });
            return;
        }

        const{email,answer1,answer2} = parsed.data;

        const answersMatched = await verifySecurityAnswersService(email,answer1,answer2);

        if(!answersMatched){
            res.status(401).json({ message: 'Security answers did not match' });
            return;
        }

        res.status(200).json({ message: 'Security answers verified successfully' });
        return;
    } catch (error) {
        console.error('Error verifying security answers:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
}

//Used to delete saved answers while testing
// export const deleteUserSecurityInfoController = async (req: Request, res: Response) => {
//   try {
//     const {email} = req?.body;  // Assuming the user Email is attached to the request body

//     if (!email) {
//       res.status(400).json({ message: "Email is missing" });
//     }

//     const result = await deleteUserSecurityInfo(email);

//     if (result) {
//       res.status(200).json({ message: "Security questions deleted successfully" });
//     } else {
//       res.status(404).json({ message: "No security questions found for this user" });
//     }

//   } catch (error) {
//     console.error("Error deleting user security info:", error);
//     res.status(500).json({ message: "Failed to delete security questions" });
//   }
// };