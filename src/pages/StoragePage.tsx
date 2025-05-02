// Archivo: src/pages/StoragePage.tsx

import { useState } from "react";
import { StorageSearchBar } from "../ui/components/StorageSearchBar";
import { FaEllipsisH } from "react-icons/fa";
import FilterButton from "../ui/components/FilterButton";
import { StorageFilters } from "../ui/components/StorageFilters";
import { DropdownActions } from "../ui/components/DropdownAction";
import { EditStorageModal } from "../ui/components/EditStorageModal";
import { ModalLayout } from "../ui/layout/ModalLayout";

// Interfaz corregida
export interface Producto {
  id: number;
  imagen: string;
  nombre: string;
  stock: number;
  estado: "Activado" | "Desactivado";
  fechaAgregado: string;
  fechaCaducidad: string;
  fechaModificacion?: string;
  descripcion: string;
  categoria: string;
  precioVenta: number;
  notas: string;
}

const storageData: Producto[] = [
  {
    id: 1,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Galletas Oreo",
    stock: 25,
    estado: "Activado",
    fechaAgregado: "01/04/2025",
    fechaCaducidad: "16/04/2025",
    descripcion: "Galletas rellenas de crema",
    categoria: "Snacks",
    precioVenta: 3.5,
    notas: "Mantener en lugar fresco."
  },
  {
    id: 2,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Coca Cola 500ml",
    stock: 48,
    estado: "Activado",
    fechaAgregado: "05/01/2024",
    fechaCaducidad: "20/01/2024",
    descripcion: "Bebida gaseosa clásica",
    categoria: "Bebidas",
    precioVenta: 2.5,
    notas: "Consumir fría."
  },
  {
    id: 3,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Yogurt Natural",
    stock: 12,
    estado: "Activado",
    fechaAgregado: "25/04/2025",
    fechaCaducidad: "09/05/2025",
    descripcion: "Yogurt sin azúcar añadido",
    categoria: "Lácteos",
    precioVenta: 4.8,
    notas: "Refrigerar a menos de 5°C"
  }
];


function parseFecha(fecha: string): Date {
  const [dia, mes, anio] = fecha.split("/").map(Number);
  return new Date(anio, mes - 1, dia);
}

export default function StoragePage() {
  const [almacen, setAlmacen] = useState<Producto[]>(storageData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroActivo, setFiltroActivo] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [productoDetalles, setProductoDetalles] = useState<Producto | null>(null);
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleDesactivarProducto = (id: number) => {
    setAlmacen((prevAlmacen) =>
      prevAlmacen.map((producto) =>
        producto.id === id
          ? {
              ...producto,
              estado: producto.estado === "Activado" ? "Desactivado" : "Activado",
              fechaModificacion: new Date().toISOString(),
            }
          : producto
      )
    );
  };

  const productosFiltrados = almacen.filter((producto) => {
    const matchFiltro =
      filtroActivo === "" ||
      (filtroActivo === "Activado" && producto.estado === "Activado") ||
      (filtroActivo === "Desactivado" && producto.estado === "Desactivado") ||
      (filtroActivo === "PorVencer" &&
        (() => {
          const fechaHoy = new Date();
          fechaHoy.setHours(0, 0, 0, 0);
          const fechaCaducidad = parseFecha(producto.fechaCaducidad);
          fechaCaducidad.setHours(0, 0, 0, 0);
          const tiempoRestante = (fechaCaducidad.getTime() - fechaHoy.getTime()) / (1000 * 60 * 60 * 24);
          return tiempoRestante >= 0 && tiempoRestante <= 15;
        })());

    const matchSearch = producto.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
      

    return matchFiltro && matchSearch;
    
    
    }
  
);
const actualizarProducto = (updatedProduct: Partial<Producto>) => {
  if (!productoEditando) return;

  setAlmacen((prevAlmacen) =>
    prevAlmacen.map((producto) =>
      producto.id === productoEditando.id
        ? { ...producto, ...updatedProduct, fechaModificacion: new Date().toISOString() }
        : producto
    )
  );

  setProductoEditando(null); // cerramos modal después de guardar
};

  return (
    <div className="flex flex-col px-6 gap-4">
      <div className="flex justify-between items-center gap-4 ">
      <StorageSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      <FilterButton />
      </div>

      {/* Filtros (cajita desplegable) */}
      {showFilters && (
        <StorageFilters
          filtroActivo={filtroActivo}
          setFiltroActivo={(filtro) => {
            setFiltroActivo(filtro);
            setShowFilters(false);
            setSearchTerm("");
          }}
          setShowFilters={setShowFilters}
        />
      )}

      <div>
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
                 <tr
                 key={producto.id}
                 className={`hover:bg-gray-50 ${
                   (() => {
                     const hoy = new Date();
                     hoy.setHours(0, 0, 0, 0);
                     const fechaCaducidad = parseFecha(producto.fechaCaducidad);
                     fechaCaducidad.setHours(0, 0, 0, 0);
                     const diasRestantes = (fechaCaducidad.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);
                     return diasRestantes >= 0 && diasRestantes <= 15 ? "bg-red-100" : "";
                   })()
                 }`}
               >               
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={producto.imagen} alt={producto.nombre} width={50} height={50} className="rounded-md mx-auto" />
                    </td>
                    <td className={`px-6 py-4 font-semibold ${producto.estado === "Desactivado" ? "text-gray-400" : ""}`}>{producto.nombre}</td>
                    <td className={`px-6 py-4 ${producto.estado === "Desactivado" ? "text-gray-400" : ""}`}>{producto.stock}</td>
                    <td className={`px-6 py-4 ${producto.estado === "Desactivado" ? "text-gray-400" : ""}`}>{producto.estado}</td>
                    <td className={`px-6 py-4 ${producto.estado === "Desactivado" ? "text-gray-400" : ""}`}>{producto.fechaAgregado}</td>
                    <td className={`px-6 py-4 ${producto.estado === "Desactivado" ? "text-gray-400" : ""}`}>{producto.fechaCaducidad}</td>
                    <td className="px-6 py-4 text-center relative">
                      <button
                        className="text-xl text-gray-700 hover:text-gray-900"
                        onClick={() => toggleDropdown(producto.id)}
                      >
                        <FaEllipsisH />
                      </button>
                      {openDropdownId === producto.id && (
                        <DropdownActions
  producto={producto}
  onDesactivar={() => {
    handleDesactivarProducto(producto.id);
    setOpenDropdownId(null);
  }}
  onVerDetalles={() => {
    setProductoDetalles(producto);
    setOpenDropdownId(null);
  }}
  onEditar={() => {
    setProductoEditando(producto); // ✅ ahora sí se usa correctamente
    setOpenDropdownId(null);
  }}
  
/>
                      
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {productoDetalles && (
        <div className="fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-300 shadow-lg z-50 animate-slide-down p-6">
          <button
            className="text-gray-500 hover:text-black absolute top-4 right-4 text-2xl"
            onClick={() => setProductoDetalles(null)}
          >
            ×
          </button>
          <h2 className="text-2xl font-bold mb-6">Detalles del Producto</h2>
          <div className="space-y-4">
            <p><span className="font-semibold">Descripción:</span> {productoDetalles.descripcion}</p>
            <p><span className="font-semibold">Categoría:</span> {productoDetalles.categoria}</p>
            <p><span className="font-semibold">Precio Venta:</span> S/ {productoDetalles.precioVenta.toFixed(2)}</p>
            {productoDetalles.fechaModificacion && (
              <p><span className="font-semibold">Última modificación:</span> {new Date(productoDetalles.fechaModificacion).toLocaleDateString()}</p>
            )}
            <p><span className="font-semibold">Notas adicionales:</span> {productoDetalles.notas}</p>
          </div>
        </div>
        
      )}
      {productoEditando && (
  <ModalLayout
    isOpen={true}
    onClose={() => setProductoEditando(null)}
    title="Editar Producto"
  >
    <EditStorageModal
      producto={productoEditando}
      onSave={(updatedProduct) => {
        actualizarProducto(updatedProduct);
      }}
      onClose={() => setProductoEditando(null)}
    />
  </ModalLayout>
)}

    </div>
  );
}
