import axios from "axios";
import { ProductServicePort } from "../../core/products/ports/product-service-port";
//import { ProductEntity } from "../../core/products/entities/product-entity";
import { ProductResponseEntity } from "../../core/products/entities/productResponse-entity";

export const productApi: ProductServicePort = {
  async addProduct(
    name,
    price,
    stock,
    description,
    categoryId,
    sellerId,
    image
  ) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", String(price));
    formData.append("stock", String(stock));
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    formData.append("sellerId", sellerId);
    if (image) {
      formData.append("image", image);
    }
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/products`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data as ProductResponseEntity;
  },
  
  async getProducts(sellerId) {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/store/getProducts/${sellerId}`
    );
    console.log("get products", response);
    return response.data;
  },
};
