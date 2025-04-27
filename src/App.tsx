import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./router/ProtectRoutes.tsx";
import PublicRoute from "./router/PublicRoutes.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import { protectedRoutes } from "./router/routes.tsx";
import PanelWrapper from "./ui/layout/PanelWrapper.tsx";

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

        {/* Rutas protegidas automáticas */}
        {protectedRoutes.map(({ path, namePage, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute>
                <PanelWrapper namePage={namePage}>{element}</PanelWrapper>
              </ProtectedRoute>
            }
          />
        ))}

        {/* Página no encontrada */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

export default App;
