import { string } from "zod";
import { UserSecurityInfo } from "../../models/User/userSecurityInfoModel"
import { getUserByEmail } from "./user.service";
import bcrypt from 'bcrypt';

export const saveUserSecurityInfoService = async (
    userEmail: string,
    data: {
        securityQuestion1: string,
        answer1: string,
        securityQuestion2: string,
        answer2: string
    }) => {
    const user = await getUserByEmail(userEmail);

    if (!user) return null;
    const userId = user._id;
    await UserSecurityInfo.create({ userId, ...data });
}

export const getUserSecurityQuestionsService = async(email:string) => {
    const user = await getUserByEmail(email);

    if(!user) return null;

    return await UserSecurityInfo.findOne({userId:user._id}).select('securityQuestion1 securityQuestion2');
}

export const verifySecurityAnswersService = async(email:string, answer1:string, answer2:string) => {
    const user = await getUserByEmail(email);

    if(!user) return null;

    const userSecurityInfo = await UserSecurityInfo.findOne({userId:user?._id})
        .select('+answer1 +answer2');

    if (!userSecurityInfo) return false;

    const match1 = await bcrypt.compare(answer1.toLowerCase(),userSecurityInfo.answer1);
    const match2 = await bcrypt.compare(answer2.toLowerCase(), userSecurityInfo.answer2);

    return match1 && match2;
}

//Used to delete saved answers while testing
// export const deleteUserSecurityInfo = async (email: string) => {
//     try {
//         const user = await getUserByEmail(email);

//     if (!user) return null;
//     const userId = user?._id;
//       // Remove the user's security information from the UserSecurityInfo collection
//       await UserSecurityInfo.findOneAndDelete({ userId });
//       return true;
//     } catch (error) {
//       console.error('Error deleting user security info', error);
//       throw new Error('Failed to delete user security info');
//     }
//   };