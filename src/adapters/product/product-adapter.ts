import { useState } from "react";
import { ProductEntity } from "../../core/products/entities/product-entity";
import {
  ProductApiError,
  ProductResponseEntity,
} from "../../core/products/entities/productResponse-entity";
import { ProductUseCases } from "../../core/products/use-cases/products-usecases";
import { productApi } from "../../services/products/prodcuts-api";
import axios from "axios";

const productUseCases = new ProductUseCases(productApi);

//////////////////
function parseApiError(e: unknown): ProductApiError {
  if (axios.isAxiosError(e) && e.response?.data) {
    return e.response.data as ProductApiError;
  }
  return { message: "Error desconocido", statusCode: 500 };
}
//////////////////

export function useProduct() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (
    product: ProductEntity
  ): Promise<ProductResponseEntity | null> => {
    setLoading(true);
    try {
      const created = await productUseCases.executeAddProduct(
        product.name,
        product.price,
        product.stock,
        product.description,
        product.categoryId,
        product.sellerId,
        product.image
      );
      setError(null);
      return created;
    } catch (e) {
      //setError(e.response?.data?.message ?? e.message);
      const apiError = parseApiError(e);
      setError(apiError.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createProduct,
  };
}
