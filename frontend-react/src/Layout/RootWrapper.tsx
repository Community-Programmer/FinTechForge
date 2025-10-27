// RootWrapper.tsx
import { silentRefresh } from '@/store/auth/authSlice';
import { AppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ChatBot } from '@/components/ChatBot';
import { Toaster } from '@/components/ui/sonner';

const RootWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Try to refresh authentication silently on app startup
    dispatch(silentRefresh()).catch(() => {
      // Silently handle refresh failures - user will need to login manually
    });
  }, [dispatch]);

   return (
    <>
      <Outlet />
      <ChatBot />
      <Toaster />
    </>
  );
};

export default RootWrapper;
