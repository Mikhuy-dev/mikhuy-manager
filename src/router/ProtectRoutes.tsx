// src/ui/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useFetchAuthSession } from "../hooks/getProfileuser";
import { useSessionStore } from "../store/useAuth-store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const {isLoading}= useFetchAuthSession()
  const seller = useSessionStore((state) => state.session?.seller);
  console.log(seller)
  if(isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (!seller) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
  
};

export default ProtectedRoute;
