import axiosInstance from "./axios";

export const getAllCurrency = async () => {
  return axiosInstance.get('/currency/getallcurrency');
}

export const currencyConvert = async (amount: number, from: string, to: string) => {
  return axiosInstance.get('/currency/convertcurrency', { params: { amount, from, to } });
}


