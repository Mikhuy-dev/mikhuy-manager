//import { ProductEntity } from "../entities/product-entity";
import { ProductResponseEntity } from "../entities/productResponse-entity";

export interface ProductServicePort {
  addProduct(
    name: string,
    price: number,
    stock: number,
    description: string,
    categoryId: string,
    sellerId: string,
    image: File | null
  ): Promise<ProductResponseEntity>;
}
