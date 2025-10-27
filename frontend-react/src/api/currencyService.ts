import axiosInstance from "./axios";
import NotificationService from '@/components/NotificationService';

export const getAllCurrency = async () => {
  try {
    const response = await axiosInstance.get('/currency/getallcurrency');
    return response;
  } catch (error) {
    NotificationService.error('Failed to load currencies. Please try again later.');
    throw error;
  }
}

export const currencyConvert = async (amount: number, from: string, to: string) => {
  try {
    const response = await axiosInstance.get('/currency/convertcurrency', { params: { amount, from, to } });
    NotificationService.success(`Converted ${amount} ${from} to ${response.data.data.convertedAmount} ${to}`);
    return response;
  } catch (error) {
    NotificationService.error('Failed to convert currency. Please check the currency codes and try again.');
    throw error;
  }
}


