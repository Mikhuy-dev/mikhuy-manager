import { Producto } from "../../pages/StoragePage"; // ✅ importa el tipo correcto

interface DropdownActionsProps {
    producto: Producto;
    onDesactivar: () => void;
    onVerDetalles: () => void;
    onEditar: () => void;
  }
  

export const DropdownActions = ({ producto, onDesactivar, onVerDetalles, onEditar }: DropdownActionsProps) => {
  return (
    <div className="absolute right-0 mt-2 w-40 bg-white border border-black rounded-md shadow-md z-50 animate-slide-down p-2">
      <button
        onClick={onDesactivar}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        {producto.estado === "Activado" ? "Desactivar" : "Activar"}
      </button>

      <button
        onClick={onVerDetalles}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        Ver detalles
      </button>

      <button
        onClick={onEditar}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        Editar
      </button>
    </div>
  );
};
