import { logout, setAccessToken } from '@/store/auth/authSlice';
import { store } from '@/store/store';
import axios from 'axios';

const api = axios.create({
  baseURL:  import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// Attach access token to each request if available
api.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Intercept 401 responses to refresh the access token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(`${ import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {}, { withCredentials: true });
        store.dispatch(setAccessToken(data.accessToken));
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
