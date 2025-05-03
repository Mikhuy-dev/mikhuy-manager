// adapters/storage/useStorage.ts
import { useState } from "react";
import { StorageEntity } from "../../core/Storage/entities/Storage-entity";
import { StoragetUseCases } from "../../core/Storage/use-cases/Storage-usecase";
import { storageApi } from "../../services/Storage/Storage-api";
import axios from "axios";

const storageUseCases = new StoragetUseCases(storageApi);

function parseApiError(e: unknown): { message: string; statusCode: number } {
  if (axios.isAxiosError(e) && e.response?.data) {
    return e.response.data as { message: string; statusCode: number };
  }
  return { message: "Error desconocido", statusCode: 500 };
}

export function useStorage() {
  const [products, setProducts] = useState<StorageEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async (sellerId: string) => {
    setLoading(true);
    try {
      const result = await storageUseCases.fetchAll(sellerId);
      setProducts(result);
      setError(null);
    } catch (e) {
      const err = parseApiError(e);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (productId: string) => {
    setLoading(true);
    try {
      const updated = await storageUseCases.toggleStatus(productId);
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      setError(null);
    } catch (e) {
      const err = parseApiError(e);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    fetchAll,
    toggleStatus,
  };
}
