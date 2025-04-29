import React, { useState } from "react";
import { Producto } from "../../pages/StoragePage";

interface EditStorageModalProps {
  producto: Producto;
  onSave: (updatedProduct: Partial<Producto>) => void;
  onClose: () => void;
}

export const EditStorageModal = ({ producto, onSave, onClose }: EditStorageModalProps) => {
  const [nombre, setNombre] = useState(producto.nombre);
  const [stock, setStock] = useState(producto.stock);
  const [descripcion, setDescripcion] = useState(producto.descripcion || "");
  const [categoria, setCategoria] = useState(producto.categoria || "");
  const [precioVenta, setPrecioVenta] = useState(producto.precioVenta || 0);
  const [notas, setNotas] = useState(producto.notas || "");
  const [nuevaImagen, setNuevaImagen] = useState<File | null>(null);
  const [previewImagen, setPreviewImagen] = useState<string>(producto.imagen);

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNuevaImagen(file);
      setPreviewImagen(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const updatedProduct: Partial<Producto> = {
      nombre,
      stock,
      imagen: nuevaImagen ? previewImagen : producto.imagen,
      descripcion,
      categoria,
      precioVenta,
      notas,
      fechaModificacion: new Date().toISOString(),
    };
    onSave(updatedProduct);
    onClose();
  };

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-300 shadow-lg z-50 animate-slide-down p-6 overflow-y-auto">
      <button
        className="text-gray-500 hover:text-black absolute top-4 right-4 text-2xl"
        onClick={onClose}
      >
        ×
      </button>

      <h2 className="text-2xl font-bold mb-6">Editar Producto</h2>

      <div className="space-y-4">
        {/* Imagen */}
        <div className="flex justify-center">
          <img
            src={previewImagen}
            alt="Vista previa"
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cambiar Imagen</label>
          <input type="file" accept="image/*" onChange={handleImagenChange} />
        </div>

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Precio de venta */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Precio de venta</label>
          <input
            type="number"
            value={precioVenta}
            onChange={(e) => setPrecioVenta(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Notas adicionales */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Notas adicionales</label>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
          />
        </div>

        {/* Botón guardar */}
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};
