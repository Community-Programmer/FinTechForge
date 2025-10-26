import { RootState } from "@/store/store";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  children?: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn, accessToken, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();

  // Show a better loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Fixed: Use correct route case to match router.tsx (/Login not /login)
  if (!isLoggedIn || !accessToken) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;
