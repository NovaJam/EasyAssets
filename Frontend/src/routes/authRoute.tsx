import axios from "axios";
import { LoginResponse } from "../types/auth";
import { SignupData } from "../types/auth";

const AUTH_URL = import.meta.env.VITE_AUTH_URL; // http://localhost:5000 for local development and production URL for deployment

// For Login Route
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${AUTH_URL}/api/auth/login`,
      {
        email,
        password,
      }
    );

    return response.data; // Return the login response data
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Rethrow the error for further handling
  }
};

// For Signup Route
export const signup = async (data: SignupData): Promise<void> => {
  try {
    await axios.post(`${AUTH_URL}/api/auth/signup`, data);
    console.log("Signup Success");
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};
