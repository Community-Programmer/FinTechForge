import axios from "axios";

const BASE_URL =  import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});



export const getChatbotResponse = async (query: string) => {
  return apiClient.get('/financechatbot/chat',{params: { query }});
}


