import React, { useState } from "react";
import axios from "axios";

interface FormData {
  name: string;
  price: number;
  stock: number;
  description: string;
  categoryId: string;
  sellerId: string;
  image: File | null;
}

export function AddProductForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    categoryId: "",
    sellerId: "",
    image: null,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Maneja el cambio de valores del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "image" && files) {
      // Subir la imagen y mostrar la vista previa
      const imageFile = files[0];
      setFormData({ ...formData, image: imageFile });

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
    const newErrors: Partial<FormData> = {};
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
      formDataImage.append("image", formData.image as Blob);

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
        image: null,
      });
      setImageUrl(null); // Limpiar la vista previa
    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Hubo un error al crear el producto.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
            className="block text-sm font-medium text-gray-700 cursor-pointer"
          >
            <div className="relative group">
              {/* Imagen */}
              <div
                className="w-32 h-32 bg-gray-200 rounded-full flex justify-center items-center"
                style={{
                  backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!imageUrl && (
                  <span className="text-gray-700 text-lg">Subir Imagen</span>
                )}
              </div>

              {/* Overlay al hacer hover */}
              <div className="absolute inset-0 bg-black bg-opacity-0 rounded-full group-hover:bg-opacity-30 transition-all duration-300"></div>

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

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Precio
        </label>
        <input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
      </div>

      <div>
        <label
          htmlFor="stock"
          className="block text-sm font-medium text-gray-700"
        >
          Stock
        </label>
        <input
          id="stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        {errors.stock && <p className="text-red-500 text-xs">{errors.stock}</p>}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descripción
        </label>
        <input
          id="description"
          name="description"
          type="text"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="categoryId"
          className="block text-sm font-medium text-gray-700"
        >
          Categoría
        </label>
        <input
          id="categoryId"
          name="categoryId"
          type="text"
          value={formData.categoryId}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        {errors.categoryId && (
          <p className="text-red-500 text-xs">{errors.categoryId}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="sellerId"
          className="block text-sm font-medium text-gray-700"
        >
          Vendedor
        </label>
        <input
          id="sellerId"
          name="sellerId"
          type="text"
          value={formData.sellerId}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        {errors.sellerId && (
          <p className="text-red-500 text-xs">{errors.sellerId}</p>
        )}
      </div>

      <button
        type="submit"
        className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
      >
        Crear Producto
      </button>
    </form>
  );
}
