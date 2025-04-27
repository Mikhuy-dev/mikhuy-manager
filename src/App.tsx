import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./router/ProtectRoutes.tsx";
import PublicRoute from "./router/PublicRoutes.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import Home from "./pages/Home.tsx";
import StoragePage from "./pages/StoragePage.tsx";
import OrderPage from "./pages/OrderPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

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

              <StoragePage />

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

              <ProductsPage />

          }
        />

        {/* Página no encontrada */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

export default App;
