import axiosInstance from "./axios";

export const getChatbotResponse = async (query: string) => {
  return axiosInstance.get('/financechatbot/chat', { params: { query } });
}


