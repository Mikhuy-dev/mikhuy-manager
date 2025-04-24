import { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { SidebarPanel } from "../components/SidebarPanel";

// Datos de ejemplo para la tabla de productos
const productosData = [
  {
    id: 1,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Galletas Oreo",
    precio: "S/ 3.00",
    stock: 25,
    categoria: "Snacks",
    descripcion: "Galletas de chocolate rellenas",
  },
  {
    id: 2,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Coca Cola 500ml",
    precio: "S/ 2.50",
    stock: 48,
    categoria: "Bebidas",
    descripcion: "Bebida gaseosa refrescante",
  },
  {
    id: 3,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Doritos Nacho",
    precio: "S/ 4.20",
    stock: 30,
    categoria: "Snacks",
    descripcion: "Tortillas de maíz con sabor a queso",
  },
  {
    id: 4,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Leche Gloria 1L",
    precio: "S/ 5.80",
    stock: 15,
    categoria: "Lácteos",
    descripcion: "Leche evaporada entera",
  },
  {
    id: 5,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Arroz Costeño 1kg",
    precio: "S/ 6.50",
    stock: 40,
    categoria: "Abarrotes",
    descripcion: "Arroz extra blanco",
  },
  {
    id: 6,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Aceite Primor 1L",
    precio: "S/ 12.90",
    stock: 22,
    categoria: "Abarrotes",
    descripcion: "Aceite vegetal de soya",
  },
  {
    id: 7,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Atún Florida",
    precio: "S/ 5.50",
    stock: 35,
    categoria: "Conservas",
    descripcion: "Filete de atún en aceite vegetal",
  },
  {
    id: 8,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Yogurt Gloria 1L",
    precio: "S/ 7.90",
    stock: 18,
    categoria: "Lácteos",
    descripcion: "Yogurt bebible sabor fresa",
  },
  {
    id: 9,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Fideos Don Vittorio",
    precio: "S/ 3.20",
    stock: 50,
    categoria: "Abarrotes",
    descripcion: "Fideos tipo spaghetti",
  },
  {
    id: 10,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Papel Higiénico Elite",
    precio: "S/ 15.90",
    stock: 28,
    categoria: "Limpieza",
    descripcion: "Paquete x4 rollos doble hoja",
  },
  {
    id: 11,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Detergente Ariel 500g",
    precio: "S/ 9.90",
    stock: 32,
    categoria: "Limpieza",
    descripcion: "Detergente en polvo con aroma floral",
  },
  {
    id: 12,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Chocolate Sublime",
    precio: "S/ 2.00",
    stock: 60,
    categoria: "Golosinas",
    descripcion: "Chocolate con maní",
  },
  {
    id: 13,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Inca Kola 2L",
    precio: "S/ 7.50",
    stock: 45,
    categoria: "Bebidas",
    descripcion: "Bebida gaseosa sabor dorado",
  },
  {
    id: 14,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Azúcar Rubia 1kg",
    precio: "S/ 4.80",
    stock: 38,
    categoria: "Abarrotes",
    descripcion: "Azúcar rubia de caña",
  },
  {
    id: 15,
    imagen: "/placeholder.svg?height=50&width=50",
    nombre: "Café Altomayo 50g",
    precio: "S/ 8.90",
    stock: 20,
    categoria: "Abarrotes",
    descripcion: "Café instantáneo liofilizado",
  },
];

export default function ProductsPage() {
  const [productos] = useState(productosData);

  return (
    <div className="flex h-screen">
      <SidebarPanel />

      <div className="flex-1 bg-[#fffbeb] overflow-auto">
        {/* Header sticky */}
        <div className="sticky top-0 z-20 bg-[#fffbeb] p-6 pb-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Productos</h1>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center">
              <span>Nuevo</span>
            </button>
          </div>
        </div>

        {/* Contenido de la tabla con padding ajustado */}
        <div className="px-6 pb-6 pt-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 top-[84px] z-10 shadow-sm">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Imagen
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Precio
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Stock
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Categoría
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Descripción
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {productos.map((producto) => (
                    <tr key={producto.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={producto.imagen || "/placeholder.svg"}
                          alt={producto.nombre}
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {producto.nombre}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">{producto.precio}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">{producto.stock}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">
                          {producto.categoria}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900 text-sm">
                          {producto.descripcion}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center space-x-2">
                          <button className="text-blue-500 hover:text-blue-700">
                            <FaPencilAlt />
                            <span className="sr-only">Editar</span>
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            <FaTrashAlt />
                            <span className="sr-only">Eliminar</span>
                          </button>
                        </div>
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
