import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";

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
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div
        onClick={handleModalClick}
        className="bg-white rounded-lg w-1/2 p-6 relative overflow-auto max-h-[90%]"
      >
        <div className="flex justify-between items-center mb-4 border-b p-6">
          <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="p-3 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
          >
            <IoClose className="text-xl" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
