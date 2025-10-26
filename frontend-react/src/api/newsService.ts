import axiosInstance from "./axios";

export const getNews = async () => {
  return axiosInstance.get('/news/getallnews');
}

export const getNewsSentiment = async (url: string) => {
  return axiosInstance.get('/news/getnewssentiment', { params: { url } });
}