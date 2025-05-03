// src/ui/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useSessionStore } from "../store/useAuth-store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = useSessionStore((state) => state.accessToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
