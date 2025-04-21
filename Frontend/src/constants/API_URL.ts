const BackEndUrl = import.meta.env.VITE_BACKEND_URL;
export const API_URL = {
    getUserSecurityQuestions_Url: `${BackEndUrl}security-questions/user`,
    verifySecurityAnswers_Url: `${BackEndUrl}security-questions/verify`,
    resetPasssword_Url: `${BackEndUrl}auth/reset-password`,
}