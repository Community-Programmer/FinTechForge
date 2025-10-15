import axios from "axios";

const BASE_URL =  import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});



export const getAllCurrency = async () => {
  return apiClient.get('/currency/getallcurrency');
}

export const currencyConvert = async (amount: Number, from: String, to: String) => {
  return apiClient.get('/currency/convertcurrency',{params: { amount, from, to }});
}


