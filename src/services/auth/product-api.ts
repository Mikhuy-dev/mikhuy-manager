import axios from "axios";
import { ProductEntity } from "../../core/auth/entities/Product-entity";
import { ProductServicePort } from "../../core/auth/ports/Product-port";

const API_BASE = "https://backend-mikhuy.onrender.com/api/store";

export const productApi: ProductServicePort = {
  async getProducts(sellerId: string): Promise<ProductEntity[]> {
    const res = await axios.get(`${API_BASE}/getProducts/${sellerId}`);
    return res.data;
  },

  async changeStatus(productId: string): Promise<ProductEntity> {
    const res = await axios.get(`${API_BASE}/changeStatusProductStore/${productId}`);
    return res.data;
  },

  async filterByStatus(sellerId: string, status: "ENABLED" | "DISABLED"): Promise<ProductEntity[]> {
    const res = await axios.get(`${API_BASE}/filterProductsByStatus/${sellerId}`, {
      params: { status },
    });
    return res.data;
  },

  async searchProducts(name: string, sellerId: string): Promise<ProductEntity[]> {
    const res = await axios.get(`${API_BASE}/searchProducts`, {
      params: { nameProduct: name, sellerId },
    });
    return res.data;
  }
};
