// src/services/storage/storage-api.ts
import axios from "axios";
import { StorageServicePort } from "../../core/Storage/ports/Storage-port";
import { StorageEntity } from "../../core/Storage/entities/Storage-entity";
import { useSessionStore } from "../../store/Storage/session-store"; 

const API_BASE = `${import.meta.env.VITE_API_URL}/store`;

function getSession() {
  const { accessToken, sellerId } = useSessionStore.getState();

  console.log("🟡 Revisar sellerId:", sellerId);
  console.log("🟢 Access Token:", accessToken);

  return {
    sellerId,
    token: accessToken,
  };
}



export const storageApi: StorageServicePort = {
  async getProducts(): Promise<StorageEntity[]> {
    const { sellerId, token } = getSession();
    const response = await axios.get(`${API_BASE}/getProducts/${sellerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // prueba con esto también si el backend espera alguna cookie
        // withCredentials: true 
      },
    });
          
    return response.data;
  },

  async changeStatus(productId: string): Promise<StorageEntity> {
    const { token } = getSession();
    const response = await axios.get(`${API_BASE}/changeStatusProductStore/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async filterByStatus(sellerId: string, status: "ENABLED" | "DISABLED"): Promise<StorageEntity[]> {
    const { token } = getSession();
    const response = await axios.get(`${API_BASE}/filterProductsByStatus/${sellerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { status },
    });
    return response.data;
  },

  async searchProducts(name: string, sellerId: string): Promise<StorageEntity[]> {
    const { token } = getSession();
    const response = await axios.get(`${API_BASE}/searchProducts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { nameProduct: name, sellerId },
    });
    return response.data;
  }
};
