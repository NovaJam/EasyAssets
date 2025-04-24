import axios from "axios";
import { API_URL } from "../constants/API_URL";
import { ResetPasswordRequest, SecurityQuestionAnswerRequest } from "../types/auth";

export const fetchDefaultSecurityQuestions = async() => {
  try {
    const res = await axios.get(API_URL.getAllQuestions_Url);
    return res.data.questions;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to load default security questions.');
    }
    throw new Error('An unexpected error occurred while loading questions.');
  }
};

export const fetchUserSecurityQuestions = async (email: string) => {
  try {
    const res = await axios.post(API_URL.getUserSecurityQuestions_Url, { email });
    return {
      question1: res.data.securityQuestion1,
      question2: res.data.securityQuestion2,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user security questions.');
    }
    throw new Error('An unexpected error occurred while fetching questions.');
  }
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
  try {
    const res = await axios.post(API_URL.verifySecurityAnswers_Url, {
      email,
      answer1,
      answer2,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to verify answers.');
    }
    throw new Error('An unexpected error occurred while verifying answers.');
  }
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

export const saveSecurityQuestions = async (data:SecurityQuestionAnswerRequest) => {
  try {
    const res = await axios.post(API_URL.saveSecurityQnAnswers_Url, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to save security questions.');
    }
    throw new Error('An unexpected error occurred while saving security questions.');
  }
}