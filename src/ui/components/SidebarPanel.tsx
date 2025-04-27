import { Link, useLocation } from "react-router-dom";
import { FaHome, FaShoppingCart, FaBox, FaWarehouse } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";

export function SidebarPanel() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="w-[250px] h-screen bg-[#fffbeb] border-r flex flex-col">
      {/* Logo */}
      <div className="flex flex-col items-center justify-center p-4 mb-6">
        <h1 className="text-3xl font-bold">BABÀ</h1>
        <p className="text-xs">S.A.C</p>
      </div>

      {/* Menú de navegación */}
      <nav className="flex-1">
        <ul className="space-y-4 px-2">
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center px-4 py-2 rounded text-black hover:bg-black/5 transition-all duration-200 ${
                currentPath === "/dashboard" ? "bg-orange-300" : ""
              }`}
            >
              <FaHome className="mr-2" />
              <span>DashBoard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/ordenes"
              className={`flex items-center px-4 py-2 rounded text-black hover:bg-black/5 transition-all duration-200 ${
                currentPath === "/ordenes" ? "bg-orange-300" : ""
              }`}
            >
              <FaShoppingCart className="mr-2" />
              <span>Ordenes</span>
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className={`flex items-center px-4 py-2 rounded text-black $ hover:bg-black/5 transition-all duration-200 ${
                currentPath === "/productos" || currentPath === "/"
                  ? "bg-orange-300"
                  : ""
              }`}
            >
              <FaBox className="mr-2" />
              <span>Productos</span>
            </Link>
          </li>
          <li>
            <Link
              to="/storage"
              className={`flex items-center px-4 py-2 rounded text-black hover:bg-black/5 transition-all duration-200 ${
                currentPath === "/almacen" ? "bg-orange-300" : ""
              }`}
            >
              <FaWarehouse className="mr-2" />
              <span>Almacén</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto mb-10 flex items-center justify-center">
        <div className="bg-black rounded-lg flex items-center gap-2 px-3 py-1">
          <img
            src="/mikhuy_icon.webp"
            alt="mikhuy icon image"
            className="size-6"
          />
          <p className="font-bold text-white">@babä@gmail.com</p>
        </div>
      </div>
      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 flex items-center justify-center text-center gap-2">
        <RiLogoutCircleLine />
        <span>Cerrar sesión</span>
      </button>
    </div>
  );
}
