// src/ui/components/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { useSessionStore } from "../store/useAuth-store";
import { useFetchAuthSession } from "../hooks/getProfileuser";


interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const seller = useSessionStore((state) => state.session?.seller);
  const {isLoading}= useFetchAuthSession()
  console.log(seller)

  if(isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>
    
  if (seller) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
