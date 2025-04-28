// src/ui/components/PublicRoute.tsx
import { Navigate } from "react-router-dom";


interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    const isAuthenticated = false;
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
