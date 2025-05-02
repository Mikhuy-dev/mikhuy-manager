// Archivo: EditStorageModal.tsx
import React, { useState } from "react";
import { BsUpload } from "react-icons/bs";
import { ProductEntity } from "../../core/auth/entities/Product-entity"; // Usa el tipo oficial

interface EditStorageModalProps {
  producto: ProductEntity;
  onSave: (updatedProduct: Partial<ProductEntity>) => void;
  onClose: () => void;
}

export const EditStorageModal = ({
  producto,
  onSave,
  onClose,
}: EditStorageModalProps) => {
  const [nombre, setNombre] = useState(producto.name);
  const [stock, setStock] = useState(producto.stock);
  const [categoria, setCategoria] = useState(producto.categoryId || "");
  const [precioVenta, setPrecioVenta] = useState(parseFloat(producto.price) || 0);
  const [descripcion, setDescripcion] = useState(producto.description || "");
  const [notas, setNotas] = useState(""); // `notas` no existe en ProductEntity
  const [nuevaImagen, setNuevaImagen] = useState<File | null>(null);
  const [previewImagen, setPreviewImagen] = useState<string>(producto.imageUrl);

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNuevaImagen(file);
      setPreviewImagen(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const updatedProduct: Partial<ProductEntity> = {
      name: nombre,
      stock,
      categoryId: categoria,
      price: precioVenta.toString(),
      description: descripcion,
      imageUrl: nuevaImagen ? previewImagen : producto.imageUrl,
    };
    onSave(updatedProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        className="bg-white rounded-lg w-1/2 p-6 relative overflow-auto max-h-[90%]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          className="text-gray-500 hover:text-black absolute top-4 right-4 text-2xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 border-b pb-4">Editar Producto</h2>

        {/* Imagen */}
        <div className="flex justify-center mb-4">
          <div className="relative group">
            <label htmlFor="image" className="block cursor-pointer">
              <div
                className="w-32 h-32 border-2 border-dashed rounded-full flex justify-center items-center border-gray-300 group-hover:border-red-600"
                style={{
                  backgroundImage: previewImagen ? `url(${previewImagen})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {(!previewImagen || previewImagen.includes("placeholder")) && (
                  <div className="text-gray-400 group-hover:text-red-600 flex flex-col items-center">
                    <BsUpload className="h-8 w-8 mb-2" />
                    <span className="text-sm">Subir Imagen</span>
                  </div>
                )}
              </div>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImagenChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Nombre */}
          <div>
            <label className="text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="text-sm font-medium text-gray-700">Categoría</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Seleccionar categoría</option>
              <option value="Abarrotes">Abarrotes</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Snacks">Snacks</option>
              <option value="Lácteos">Lácteos</option>
            </select>
          </div>

          {/* Precio */}
          <div>
            <label className="text-sm font-medium text-gray-700">Precio</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">S/</span>
              </div>
              <input
                type="number"
                step="0.01"
                min={0}
                value={precioVenta}
                onChange={(e) => setPrecioVenta(Number(e.target.value))}
                className="pl-8 w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Stock */}
          <div>
            <label className="text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              value={stock}
              min={0}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md min-h-[80px]"
          />
        </div>

        {/* Notas adicionales (no existe en backend, solo frontend) */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">Notas (opcional)</label>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md min-h-[80px]"
          />
        </div>

        {/* Botón Guardar */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};
