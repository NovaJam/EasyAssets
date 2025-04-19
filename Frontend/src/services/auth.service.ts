import axios from "axios";
import { API_URL } from "../constants/API_URL";
import { ResetPasswordRequest } from "../types/auth";

export const fetchUserSecurityQuestions = async (email: string) => {
  const res = await axios.post(API_URL.getUserSecurityQuestions_Url, { email });
  return {
    question1: res.data.securityQuestion1,
    question2: res.data.securityQuestion2,
  };
};

export const verifySecurityAnswers = async ({
  email,
  answer1,
  answer2,
}: {
  email: string;
  answer1: string;
  answer2: string;
}) => {
  const res = await axios.post(API_URL.verifySecurityAnswers_Url, {
    email,
    answer1,
    answer2,
  });
  return res.data;
};

export const resetPassword = async (data: ResetPasswordRequest) => {
  try {
    const response = await axios.patch(API_URL.resetPasssword_Url, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to reset password. Please try again.');
    }
    throw new Error('An unexpected error occurred. Please try again.');
  }
};