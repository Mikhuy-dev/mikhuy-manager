import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./ui/pages/LoginPage.tsx";
import Home from "./ui/pages/Home.tsx";
import NotFoundPage from "./ui/pages/NotFoundPage.tsx";
import StoragePage from "./ui/pages/StoragePage.tsx";
import OrderPage from "./ui/pages/OrderPage.tsx";
import ProductsPage from "./ui/pages/ProductsPage.tsx";
import ProtectedRoute from "./ui/components/ProtectRoutes.tsx";
import PublicRoute from "./ui/components/PublicRoutes.tsx";

function App() {
  return (
    <main className="bg-[#f4f0c9] min-h-screen">
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Rutas protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/storage"
          element={
            <ProtectedRoute>
              <StoragePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />

        {/* Página no encontrada */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

export default App;
