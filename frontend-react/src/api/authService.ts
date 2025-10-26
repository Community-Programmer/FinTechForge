
import { loginUser, ResetPasswordFormData, signupUser } from '@/validation/userSchema';
import axios from 'axios';
import { API_BASE_URL } from '@/config/env';

// Create a separate instance for auth services since they don't need auth tokens
const authApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export const signUp = async (data: signupUser) => {
  return authApiClient.post('/auth/signup', data);
}

export const signIn = async (data: loginUser) => {
  return authApiClient.post('/auth/signin', data);
}

export const forgotPassword = async (data: { email: string }) => {
  return authApiClient.post('/auth/reset-password', data);
}

export const verifyUserEmail = async (verificationToken: string | undefined) => {
  return authApiClient.get(`/auth/verify-email/${verificationToken}`);
}

export const verifyResetToken = async (resetToken: string | undefined) => {
  return authApiClient.get(`/auth/verify-token/${resetToken}`);
}

export const resetPassword = async (data: ResetPasswordFormData, resetToken: string | undefined) => {
  return authApiClient.post(`/auth/reset-password/${resetToken}`, data);
}

