import { RootState } from '@/store/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children?: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn, accessToken, loading } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

    console.log("ProtectedRoute - isLoggedIn:", isLoggedIn, "accessToken:", accessToken, "loading:", loading);

  if (loading) return <div>Loading...</div>;

  if (!isLoggedIn || !accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;
