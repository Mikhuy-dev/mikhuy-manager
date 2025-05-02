// Archivo: src/ui/components/StorageTable.tsx
import { FaEllipsisH } from "react-icons/fa";
import { DropdownActions } from "./DropdownAction";
import type { ProductEntity } from "../../core/auth/entities/Product-entity";
import { useEffect, useRef, useState } from "react";

interface StorageTableProps {
  productos: ProductEntity[];
  openDropdownId: string | null;
  toggleDropdown: (id: string) => void;
  onEditar: (producto: ProductEntity) => void;
  onVerDetalles: (producto: ProductEntity) => void;
  onDesactivar: (id: string) => void;
  filtroActivo: string;
}

export const StorageTable = ({
  productos,
  openDropdownId,
  toggleDropdown,
  onEditar,
  onVerDetalles,
  onDesactivar,
}: StorageTableProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        toggleDropdown("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggleDropdown]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProductos = productos.slice(startIndex, endIndex);
  const totalPages = Math.ceil(productos.length / itemsPerPage);

  return (
    <div className="overflow-auto bg-white rounded-lg shadow-md max-h-[calc(100vh-200px)]">
      <div className="min-w-full">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Imagen</th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Producto</th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Stock</th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Estado</th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Fecha Agregado</th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Fecha Caducidad</th>
              <th className="px-6 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wide">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProductos.map((producto) => {
              const fechaHoy = new Date();
              const fechaCaducidad = new Date(producto.expirationDate);
              const diferenciaDias = (fechaCaducidad.getTime() - fechaHoy.getTime()) / (1000 * 60 * 60 * 24);
              const estaPorVencer = diferenciaDias >= 0 && diferenciaDias <= 15;
              const esDesactivado = producto.status === "DISABLED";
              const rowColor = esDesactivado
                ? "text-gray-400"
                : estaPorVencer
                ? "bg-red-100 text-gray-900"
                : "text-gray-900";
              const rowHover = estaPorVencer ? "" : "hover:bg-gray-50";

              return (
                <tr key={producto.id} className={`${rowHover} ${rowColor}`}>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <img
                      src={producto.imageUrl || "/placeholder.svg"}
                      alt={producto.name}
                      width={40}
                      height={40}
                      className="rounded-md mx-auto"
                    />
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap font-semibold">{producto.name}</td>
                  <td className="px-6 py-2 whitespace-nowrap">{producto.stock}</td>
                  <td className="px-6 py-2 whitespace-nowrap">{producto.status}</td>
                  {/* <td className="px-6 py-2 whitespace-nowrap">{new Date(producto.createdAt).toLocaleDateString()}</td> */}
                  <td className="px-6 py-2 whitespace-nowrap">{new Date(producto.expirationDate).toLocaleDateString()}</td>
                  <td className="px-6 py-2 whitespace-nowrap text-center relative">
                    <button
                      className="text-xl text-gray-700 hover:text-gray-900"
                      onClick={() => toggleDropdown(producto.id)}
                    >
                      <FaEllipsisH />
                    </button>
                    {openDropdownId === producto.id && (
                      <div ref={dropdownRef}>
                        <DropdownActions
                          producto={producto}
                          onEditar={() => onEditar(producto)}
                          onVerDetalles={() => onVerDetalles(producto)}
                          onDesactivar={() => onDesactivar(producto.id)}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center items-center py-4 gap-2 text-sm">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};
