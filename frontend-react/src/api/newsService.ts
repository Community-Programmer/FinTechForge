import axiosInstance from "./axios";
import NotificationService from '@/components/NotificationService';

export const getNews = async () => {
  try {
    const response = await axiosInstance.get('/news/getallnews');
    return response;
  } catch (error) {
    NotificationService.error('Failed to load financial news. Please try again later.');
    throw error;
  }
}

export const getNewsSentiment = async (url: string) => {
  try {
    const response = await axiosInstance.get('/news/getnewssentiment', { params: { url } });
    NotificationService.info('News sentiment analysis completed.');
    return response;
  } catch (error) {
    NotificationService.error('Failed to analyze news sentiment. Please try again later.');
    throw error;
  }
}