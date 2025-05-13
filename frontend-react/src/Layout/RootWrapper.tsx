// RootWrapper.tsx
import { silentRefresh } from '@/store/auth/authSlice';
import { AppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ChatBot } from '@/components/ChatBot';

const RootWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(silentRefresh());
  }, [dispatch]);

  return (
    <>
      <Outlet />
      <ChatBot />
    </>
  );
};

export default RootWrapper;
