const BackEndUrl = import.meta.env.VITE_BACKEND_URL;
export const API_URL = {
    getAllQuestions_Url: `${BackEndUrl}security-questions`,
    saveSecurityQnAnswers_Url: `${BackEndUrl}security-questions/save`,
    getUserSecurityQuestions_Url: `${BackEndUrl}security-questions/user`,
    verifySecurityAnswers_Url: `${BackEndUrl}security-questions/verify`,
    resetPasssword_Url: `${BackEndUrl}auth/reset-password`,
}