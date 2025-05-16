import Profile from "@/pages/Profile/Profile";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const protectedRoutes = [
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
];

export default protectedRoutes;
