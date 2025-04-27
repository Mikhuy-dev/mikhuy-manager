import { Link, useLocation } from "react-router-dom";
import { RiEdit2Line, RiLogoutCircleLine, RiUser3Line } from "react-icons/ri";
import { protectedRoutes } from "../../router/routes";
import { useState } from "react";

export function SidebarPanel() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
          {protectedRoutes.map((route) => (
            <li key={route.path}>
              <Link
                to={route.path}
                className={`flex items-center px-4 py-2 rounded text-black hover:bg-black/5 transition-all duration-200 ${
                  currentPath === route.path ? "bg-orange-300" : ""
                }`}
              >
                {route.icon} {/* Aquí se muestra el icono */}
                <span>{route.namePage}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer con menú flotante */}
      <div className="w-full h-[1.5px] bg-gray-200"></div>
      <div className="mb-5 mt-5 flex items-center justify-center relative">
        <button
          onClick={toggleMenu}
          className="text-black rounded-3xl flex items-center gap-2 px-3 py-2 hover:bg-gray-200 transition-all duration-200"
        >
          <img
            src="/mikhuy_icon.webp"
            alt="mikhuy icon image"
            className="size-6"
          />
          <p className="font-medium">babä@gmail.com</p>
        </button>

        {menuOpen && (
          <div className="absolute right-[-170px] bottom-0 w-48 bg-white rounded-lg shadow-lg border p-2 space-y-2 z-10">
            <Link
              to="/perfil"
              className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded transition-all"
            >
              <RiUser3Line className="text-black" />
              <span className="text-black">Perfil</span>
            </Link>
            <Link
              to="/editar-perfil"
              className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded transition-all"
            >
              <RiEdit2Line className="text-black" />
              <span className="text-black">Editar perfil</span>
            </Link>
            <button
              onClick={() => console.log("Cerrar sesión")}
              className="flex items-center gap-2 px-2 py-2 bg-red-300 hover:bg-red-400 rounded w-full text-left transition-all"
            >
              <RiLogoutCircleLine className="text-black" />
              <span className="text-black">Cerrar sesión</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
