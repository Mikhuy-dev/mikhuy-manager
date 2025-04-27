import { Link, useLocation } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { protectedRoutes } from "../../router/routes";

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
