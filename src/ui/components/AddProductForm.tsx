import React, { useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { BsUpload } from "react-icons/bs";
import { ProductEntity } from "../../core/products/entities/product-entity";

export function AddProductForm() {
  const [formData, setFormData] = useState<Partial<ProductEntity>>({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    categoryId: "",
    sellerId: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState<Partial<ProductEntity>>({});
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Maneja el cambio de valores del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "image" && files) {
      // Subir la imagen y mostrar la vista previa
      const imageFile = files[0];
      //setFormData({ ...formData, image: imageFile });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string); // Establece la URL de la vista previa
      };
      reader.readAsDataURL(imageFile);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Validación simple de los campos
  const validate = (): boolean => {
    const newErrors: Partial<ProductEntity> = {};
    if (!formData.name) newErrors.name = "El nombre es obligatorio";
    // if (!formData.price) newErrors.price = "El precio es obligatorio";
    // if (!formData.stock) newErrors.stock = "El stock es obligatorio";
    if (!formData.description)
      newErrors.description = "La descripción es obligatoria";
    if (!formData.categoryId)
      newErrors.categoryId = "La categoría es obligatoria";
    if (!formData.sellerId) newErrors.sellerId = "El vendedor es obligatorio";
    //  if (!formData.image) newErrors.image = "La imagen es obligatoria";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      // Primero subimos la imagen y obtenemos la URL
      const formDataImage = new FormData();
      //formDataImage.append("image", formData.image as Blob);

      const imageResponse = await axios.post("/api/upload", formDataImage, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedImageUrl = imageResponse.data.url;

      // Ahora enviamos todos los datos junto con la URL de la imagen
      const productData = { ...formData, imageUrl: uploadedImageUrl };
      await axios.post("/api/products", productData);

      alert("Producto creado con éxito!");
      setFormData({
        name: "",
        price: 0,
        stock: 0,
        description: "",
        categoryId: "",
        sellerId: "",
        imageUrl: "",
      });
      setImageUrl(null); // Limpiar la vista previa
    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Hubo un error al crear el producto.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <label
        htmlFor="image"
        className="block text-sm font-medium text-gray-700"
      >
        Subir Imagen
      </label>
      <div className="flex justify-center">
        <div className="relative">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-400 cursor-pointer"
          >
            <div className="relative group">
              {/* Imagen */}
              <div
                className="w-32 h-32 border-2 border-dashed rounded-full flex justify-center items-center group-hover:border-red-700 transition-all duration-200"
                style={{
                  backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!imageUrl && (
                  <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-red-700 transition-all duration-200">
                    <BsUpload className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">Subir Imagen</span>
                  </div>
                )}
              </div>
              {/* Input oculto */}
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </label>
        </div>
      </div>

      {/* {errors.image && <p className="text-red-500 text-xs">{errors.image}</p>} */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-700 focus:border-red-700"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        {/* Categoría */}
        <div className="space-y-2">
          <label htmlFor="categoryId" className="text-sm font-medium">
            Categoría
          </label>
          <select
            id="categoryId"
            name="categoryId"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-700 focus:border-red-700"
          >
            <option value="" disabled selected>
              Seleccionar categoría
            </option>
            <option value="35670354-b91b-45ad-b786-29ffd253e013">Comidas rápidas</option>
            <option value="35ea7b17-412b-4e72-b26c-6dbcd8a5cb55">Snacks</option>
            <option value="747cb17f-f050-4d57-9ce9-e8d79d578ebe">Repostería</option>
            <option value="de1eee8d-857c-4918-bd2d-567180e250e3">Bebidas</option>
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-xs">{errors.categoryId}</p>
          )}
        </div>

        {/* Precio */}
        <div className="space-y-2">
          <label htmlFor="price" className="text-sm font-medium text-gray-700">
            Precio
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">S/</span>
            </div>
            <input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-700 focus:border-red-700"
            />
          </div>
          {errors.price && (
            <p className="text-red-500 text-xs">{errors.price}</p>
          )}
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <label htmlFor="stock" className="text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-700 focus:border-red-700"
          />
          {errors.stock && (
            <p className="text-red-500 text-xs">{errors.stock}</p>
          )}
        </div>
      </div>

      {/* Descripción */}
      <div className="space-y-2 border-b py-5">
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-700"
        >
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm min-h-[100px] focus:ring-2 focus:ring-red-700 focus:border-red-700"
        />
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description}</p>
        )}
      </div>

      {/* Botón de envío */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaPlus className="h-4 w-4 mr-2" />
          Crear Producto
        </button>
      </div>
    </form>
  );
}
