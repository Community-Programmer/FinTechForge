import axios from "axios";

const BASE_URL =  import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});



export const getNews = async () => {
  return apiClient.get('/news/getallnews');
}


export const getNewsSentiment = async (url: string) => {
  return apiClient.get('/news/getnewssentiment',{params: { url }});
}