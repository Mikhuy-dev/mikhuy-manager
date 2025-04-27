import { FaEllipsisH } from "react-icons/fa";

interface Producto {
  id: number;
  imagen: string;
  nombre: string;
  stock: number;
  estado: string;
  fechaAgregado: string;
  fechaCaducidad: string;
}

interface StorageTableProps {
  productos: Producto[];
  openDropdownId: number | null;
  toggleDropdown: (id: number) => void;
}

function parseFecha(fecha: string): Date {
  const [dia, mes, anio] = fecha.split("/").map(Number);
  return new Date(anio, mes - 1, dia);
}

export const StorageTable = ({
  productos,
  toggleDropdown,
}: StorageTableProps) => {
  return (
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
              {productos.map((producto) => {
                const fechaHoy = new Date();
                const fechaCaducidad = parseFecha(producto.fechaCaducidad);
                const diferenciaDias = (fechaCaducidad.getTime() - fechaHoy.getTime()) / (1000 * 60 * 60 * 24);

                const estaPorVencer = diferenciaDias >= 0 && diferenciaDias <= 15;

                return (
                  <tr key={producto.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        width={50}
                        height={50}
                        className="rounded-md mx-auto"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">{producto.nombre}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{producto.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{producto.estado}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{producto.fechaAgregado}</td>
                    <td className={`px-6 py-4 whitespace-nowrap ${estaPorVencer ? "text-red-500" : "text-gray-900"}`}>
                      {producto.fechaCaducidad}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center relative">
                      <button
                        className="text-xl text-gray-700 hover:text-gray-900"
                        onClick={() => toggleDropdown(producto.id)}
                      >
                        <FaEllipsisH />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
