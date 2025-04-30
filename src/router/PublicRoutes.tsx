// src/ui/components/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { useSessionStore } from "../adapters/auth/useAuth-store";


interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = useSessionStore((state) => state.accessToken);
    
  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
