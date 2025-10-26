
import { loginUser, ResetPasswordFormData, signupUser } from '@/validation/userSchema';
import axios from 'axios';
import { API_BASE_URL } from '@/config/env';
import NotificationService from '@/components/NotificationService';

// Create a separate instance for auth services since they don't need auth tokens
const authApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export const signUp = async (data: signupUser) => {
  try {
    const response = await authApiClient.post('/auth/signup', data);
    NotificationService.success('Account created successfully! Please check your email for verification.');
    return response;
  } catch (error) {
    NotificationService.error('Failed to create account. Please try again.');
    throw error;
  }
}

export const signIn = async (data: loginUser) => {
  try {
    const response = await authApiClient.post('/auth/signin', data);
    return response;
  } catch (error) {
    NotificationService.error('Login failed. Please check your credentials.');
    throw error;
  }
}

export const forgotPassword = async (data: { email: string }) => {
  try {
    const response = await authApiClient.post('/auth/reset-password', data);
    NotificationService.success('Password reset email sent. Please check your inbox.');
    return response;
  } catch (error) {
    NotificationService.error('Failed to send password reset email. Please try again.');
    throw error;
  }
}

export const verifyUserEmail = async (verificationToken: string | undefined) => {
  try {
    const response = await authApiClient.get(`/auth/verify-email/${verificationToken}`);
    NotificationService.success('Email verified successfully!');
    return response;
  } catch (error) {
    NotificationService.error('Failed to verify email. Please try again.');
    throw error;
  }
}

export const verifyResetToken = async (resetToken: string | undefined) => {
  try {
    const response = await authApiClient.get(`/auth/verify-token/${resetToken}`);
    return response;
  } catch (error) {
    NotificationService.error('Invalid or expired reset token.');
    throw error;
  }
}

export const resetPassword = async (data: ResetPasswordFormData, resetToken: string | undefined) => {
  try {
    const response = await authApiClient.post(`/auth/reset-password/${resetToken}`, data);
    NotificationService.success('Password has been reset successfully. You can now login.');
    return response;
  } catch (error) {
    NotificationService.error('Failed to reset password. Please try again.');
    throw error;
  }
}

