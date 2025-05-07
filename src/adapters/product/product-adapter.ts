import { useState } from "react";
import { ProductEntity } from "../../core/products/entities/product-entity";
import { ProductResponseEntity } from "../../core/products/entities/productResponse-entity";
import { ProductUseCases } from "../../core/products/use-cases/products-usecases";
import { productApi } from "../../services/products/prodcuts-api";

const productUseCases = new ProductUseCases(productApi);

//////////////////
// function parseApiError(e: unknown): ProductApiError {
//   if (axios.isAxiosError(e) && e.response?.data) {
//     return e.response.data as ProductApiError;
//   }
//   return { message: "Error desconocido", statusCode: 500 };
// }
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
        product.imageUrl,
        product.expirationDate
      );
      setError(null);
      return created;
    } catch (e: any) {
      setError(e.response?.data?.message ?? e.message);
      //const apiError = parseApiError(e);
      //setError(apiError.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async (
    sellerId: string
  ): Promise<ProductResponseEntity[] | null> => {
    setLoading(true);
    try {
      const products = await productUseCases.executeGetProducts(sellerId);
      setError(null);
      return products;
    } catch (e: any) {
      setError(e.response?.data?.message ?? e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    error,
    createProduct,
    getProducts,
  };
}
