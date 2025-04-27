import { useState } from "react";
import { SidebarPanel } from "../ui/components/SidebarPanel";
import { StorageSearchBar } from "../ui/components/StorageSearchBar";
import { StorageFilters } from "../ui/components/StorageFilters";
import { FaEllipsisH } from "react-icons/fa";

// Datos de ejemplo
const storageData = [
  {
    id: 1,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Galletas Oreo",
    stock: 25,
    estado: "Activado",
    fechaAgregado: "01/04/2025",
    fechaCaducidad: "16/04/2025",
  },
  {
    id: 2,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Coca Cola 500ml",
    stock: 48,
    estado: "Activado",
    fechaAgregado: "05/01/2024",
    fechaCaducidad: "20/01/2024",
  },
];

function parseFecha(fecha: string): Date {
  const [dia, mes, anio] = fecha.split("/").map(Number);
  return new Date(anio, mes - 1, dia);
}

export default function StoragePage() {
  const [almacen] = useState(storageData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroActivo, setFiltroActivo] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const productosFiltrados = almacen.filter((producto) => {
    const matchFiltro =
      filtroActivo === ""
        || (filtroActivo === "Activado" && producto.estado === "Activado")
        || (filtroActivo === "Desactivado" && producto.estado === "Desactivado")
        || (filtroActivo === "PorVencer" && (() => {
          const fechaHoy = new Date();
          fechaHoy.setHours(0, 0, 0, 0);
          const fechaCaducidad = parseFecha(producto.fechaCaducidad);
          fechaCaducidad.setHours(0, 0, 0, 0);
          const tiempoRestante = (fechaCaducidad.getTime() - fechaHoy.getTime()) / (1000 * 60 * 60 * 24);
          return tiempoRestante >= 0 && tiempoRestante <= 15;
        })());

    const matchSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase());

    return matchFiltro && matchSearch;
  });

  return (
    <div className="flex h-screen">
      <SidebarPanel />

      <div className="flex-1 bg-[#fffbeb] overflow-auto">
        <div className="sticky top-0 z-20 bg-[#fffbeb] p-6 pb-0 ">
          <h1 className="text-3xl font-bold text-black">ALMACÉN</h1>
        </div>



        {/* SearchBar */}
        <StorageSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        {/* Filtros (cajita desplegable) */}
        {showFilters && (
          <StorageFilters
            filtroActivo={filtroActivo}
            setFiltroActivo={(filtro) => {
              setFiltroActivo(filtro);
              setSearchTerm(""); // limpiar búsqueda al cambiar filtro
            }}
          />
        )}

        {/* Tabla */}
        <div className="px-6 pb-6">
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Agregado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Caducidad</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
                  {productosFiltrados.map((producto) => (
                    <tr key={producto.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={producto.imagen} alt={producto.nombre} width={50} height={50} className="rounded-md mx-auto" />
                      </td>
                      <td className="px-6 py-4 font-semibold">{producto.nombre}</td>
                      <td className="px-6 py-4">{producto.stock}</td>
                      <td className="px-6 py-4">{producto.estado}</td>
                      <td className="px-6 py-4">{producto.fechaAgregado}</td>
                      <td className="px-6 py-4">{producto.fechaCaducidad}</td>
                      <td className="px-6 py-4 text-center relative">
                        <button
                          className="text-xl text-gray-700 hover:text-gray-900"
                          onClick={() => toggleDropdown(producto.id)}
                        >
                          <FaEllipsisH />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
