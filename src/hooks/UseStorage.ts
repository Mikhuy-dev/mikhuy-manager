import { useState } from "react";
import { ProductUseCases } from "../core/auth/use-cases/Product-usecase";
import { productApi } from "../services/auth/product-api";
import { ProductEntity } from "../core/auth/entities/Product-entity";

const useProductUseCases = new ProductUseCases(productApi);

export function useStorage() {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async (sellerId: string) => {
    try {
      setLoading(true);
      const result = await useProductUseCases.fetchAll(sellerId);
      setProducts(result);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Ocurrió un error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  return { products, fetchAll, loading, error };
}
