import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { User } from '@/types/auth';
import { RootState } from '../store';
import NotificationService from '@/components/NotificationService';
 
  const initialState: {
  isLoggedIn: boolean;
  user: User | null;
  accessToken: string | null;
  loading: boolean;
} = {
  isLoggedIn: false,
  user: null,
  accessToken: null,
  loading: true,
};
  
  export const silentRefresh = createAsyncThunk('auth/silentRefresh', async (_, { dispatch, getState, rejectWithValue }) => {
    const { isLoggedIn, accessToken } = (getState() as RootState).auth;

    // Only attempt refresh if user is logged in or we have no token
    if (!isLoggedIn && !accessToken) {
      return rejectWithValue('No authentication state to refresh');
    }
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {}, { withCredentials: true });
      return response.data;
    } catch (error) {
      dispatch(logout());
      console.error('Silent refresh failed:', error);
      NotificationService.error('Session expired. Please log in again.');
      return rejectWithValue('Refresh failed');
    }
  });

  export const login = createAsyncThunk('auth/login', async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/signin`, credentials, { withCredentials: true });
      NotificationService.success('Login successful!');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      NotificationService.error(message);
      return rejectWithValue(message);
    }
  });

  export const register = createAsyncThunk('auth/register', async (userData: { email: string; password: string; name: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, userData, { withCredentials: true });
      NotificationService.success('Registration successful! Please check your email for verification.');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      NotificationService.error(message);
      return rejectWithValue(message);
    }
  });

  const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
      setAccessToken: (state, action) => {
        state.accessToken = action.payload;
        state.loading = false;
      },
      logout: (state) => {
        state.accessToken = null;
        state.isLoggedIn = false;
        state.user = null;
        state.loading = false;
        NotificationService.info('You have been logged out.');
      },
    },
    extraReducers: (builder) => {
      builder.addCase(silentRefresh.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(silentRefresh.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoggedIn = true;
          state.accessToken = action.payload.accessToken;
          state.user = action.payload.user;
        }
        state.loading = false;
      });
      builder.addCase(silentRefresh.rejected, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
      });
      
      builder.addCase(login.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.loading = false;
      });
      builder.addCase(login.rejected, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
      });
      
      builder.addCase(register.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      });
      builder.addCase(register.rejected, (state) => {
        state.loading = false;
      });
    },
  });

  export const { setAccessToken, logout } = authSlice.actions;

  export default authSlice.reducer;


