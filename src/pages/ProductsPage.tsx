import { useEffect, useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { ModalLayout } from "../ui/layout/ModalLayout";
import { AddProductForm } from "../ui/components/AddProductForm";
import { useSessionStore } from "../store/useAuth-store";
import { useProduct } from "../adapters/product/product-adapter";
import { ProductEntity } from "../core/products/entities/product-entity";

// Datos de ejemplo para la tabla de productos
// const productosData = [
//   {
//     id: 1,
//     imagen: "/placeholder.svg?height=50&width=50",
//     nombre: "Galletas Oreo",
//     precio: "S/ 3.00",
//     stock: 25,
//     categoria: "Snacks",
//     descripcion: "Galletas de chocolate rellenas",
//   },
//   {
//     id: 2,
//     imagen: "/placeholder.svg?height=50&width=50",
//     nombre: "Coca Cola 500ml",
//     precio: "S/ 2.50",
//     stock: 48,
//     categoria: "Bebidas",
//     descripcion: "Bebida gaseosa refrescante",
//   },
//   {
//     id: 3,
//     imagen: "/placeholder.svg?height=50&width=50",
//     nombre: "Doritos Nacho",
//     precio: "S/ 4.20",
//     stock: 30,
//     categoria: "Snacks",
//     descripcion: "Tortillas de maíz con sabor a queso",
//   },
//   {
//     id: 4,
//     imagen: "/placeholder.svg?height=50&width=50",
//     nombre: "Leche Gloria 1L",
//     precio: "S/ 5.80",
//     stock: 15,
//     categoria: "Lácteos",
//     descripcion: "Leche evaporada entera",
//   },
//   {
//     id: 5,
//     imagen: "/placeholder.svg?height=50&width=50",
//     nombre: "Arroz Costeño 1kg",
//     precio: "S/ 6.50",
//     stock: 40,
//     categoria: "Abarrotes",
//     descripcion: "Arroz extra blanco",
//   },
//   {
//     id: 6,
//     imagen: "/placeholder.svg?height=50&width=50",
//     nombre: "Aceite Primor 1L",
//     precio: "S/ 12.90",
//     stock: 22,
//     categoria: "Abarrotes",
//     descripcion: "Aceite vegetal de soya",
//   },
//   {
//     id: 7,
//     imagen: "/placeholder.svg?height=50&width=50",
//     nombre: "Atún Florida",
//     precio: "S/ 5.50",
//     stock: 35,
//     categoria: "Conservas",
//     descripcion: "Filete de atún en aceite vegetal",
//   },
//   {
//     id: 8,
//     imagen: "/placeholder.svg?height=50&width=50",
//     nombre: "Yogurt Gloria 1L",
//     precio: "S/ 7.90",
//     stock: 18,
//     categoria: "Lácteos",
//     descripcion: "Yogurt bebible sabor fresa",
//   },
//   {
//     id: 9,
//     imagen: "/placeholder.svg?height=50&width=50",
//     nombre: "Fideos Don Vittorio",
//     precio: "S/ 3.20",
//     stock: 50,
//     categoria: "Abarrotes",
//     descripcion: "Fideos tipo spaghetti",
//   },
//   {
//     id: 10,
//     imagen: "/placeholder.svg?height=50&width=50",
//     nombre: "Papel Higiénico Elite",
//     precio: "S/ 15.90",
//     stock: 28,
//     categoria: "Limpieza",
//     descripcion: "Paquete x4 rollos doble hoja",
//   },
//   {
//     id: 11,
//     imagen: "/placeholder.svg?height=50&width=50",
//     nombre: "Detergente Ariel 500g",
//     precio: "S/ 9.90",
//     stock: 32,
//     categoria: "Limpieza",
//     descripcion: "Detergente en polvo con aroma floral",
//   },
//   {
//     id: 12,
//     imagen: "/placeholder.svg?height=50&width=50",
//     nombre: "Chocolate Sublime",
//     precio: "S/ 2.00",
//     stock: 60,
//     categoria: "Golosinas",
//     descripcion: "Chocolate con maní",
//   },
//   {
//     id: 13,
//     imagen: "/placeholder.svg?height=50&width=50",
//     nombre: "Inca Kola 2L",
//     precio: "S/ 7.50",
//     stock: 45,
//     categoria: "Bebidas",
//     descripcion: "Bebida gaseosa sabor dorado",
//   },
//   {
//     id: 14,
//     imagen: "/placeholder.svg?height=50&width=50",
//     nombre: "Azúcar Rubia 1kg",
//     precio: "S/ 4.80",
//     stock: 38,
//     categoria: "Abarrotes",
//     descripcion: "Azúcar rubia de caña",
//   },
//   {
//     id: 15,
//     imagen: "/placeholder.svg?height=50&width=50",
//     nombre: "Café Altomayo 50g",
//     precio: "S/ 8.90",
//     stock: 20,
//     categoria: "Abarrotes",
//     descripcion: "Café instantáneo liofilizado",
//   },
// ];

const categoryMap: Record<string, string> = {
  "35670354-b91b-45ad-b786-29ffd253e013": "Comidas rápidas",
  "35ea7b17-412b-4e72-b26c-6dbcd8a5cb55": "Snacks",
  "747cb17f-f050-4d57-9ce9-e8d79d578ebe": "Repostería",
  "de1eee8d-857c-4918-bd2d-567180e250e3": "Bebidas",
};

export default function ProductsPage() {
  const seller = useSessionStore((state) => state.seller);

  const { getProducts, error, loading } = useProduct();
  const [products, setProducts] = useState<ProductEntity[]>([]);

  useEffect(() => {
    if (!seller) {
      console.log("NO SELLER - ERROR");
      return;
    }

    const fetchProducts = async () => {
      const result = await getProducts(seller.id);
      if (result) {
        setProducts(result); // ajusta según estructura real
      }
    };

    fetchProducts();
  }, [seller]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col p-6 gap-4">
      <div className="flex justify-end">
        <button
          onClick={toggleModal}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center"
        >
          <span>Nuevo</span>
        </button>
      </div>
      <ModalLayout
        title="Añadir nuevo producto"
        isOpen={isModalOpen}
        onClose={toggleModal}
      >
        <AddProductForm />
      </ModalLayout>
      {/* Contenedor de la tabla con scroll */}
      <div className="overflow-auto bg-white rounded-lg shadow-md max-h-[calc(100vh-200px)]">
        {" "}
        {/* Ajuste de max-height */}
        <div className="min-w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Imagen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-10 w-10 bg-gray-200 rounded-md" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-24" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-16" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-12" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-24" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-32" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="h-4 bg-gray-200 rounded w-20 mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : error ? (
              <tbody>
                <tr>
                  <td colSpan={7} className="text-center text-red-600 py-6">
                    Error al cargar productos: {error}
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{product.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{product.stock}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">
                        {categoryMap[product.categoryId] || "Sin categoria"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900 text-sm">
                        {product.description}
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
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
