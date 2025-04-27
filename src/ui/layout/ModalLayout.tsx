import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void; // Función para cerrar el modal
  children: ReactNode;
  title: string;
}

export function ModalLayout({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Previene el cierre cuando se hace clic dentro del contenido del modal
  };

  return (
    <div
      onClick={onClose} // Cierra el modal cuando se hace clic fuera del modal
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div
        onClick={handleModalClick} // Esto evita que el clic dentro del contenedor cierre el modal
        className="bg-white rounded-lg w-1/2 p-6 relative overflow-auto max-h-[90%]"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="text-2xl">&times;</span> {/* Ícono de cierre */}
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
