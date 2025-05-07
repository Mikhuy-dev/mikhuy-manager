//import { ProductEntity } from "../entities/product-entity";
import { ProductResponseEntity } from "../entities/productResponse-entity";

export interface ProductServicePort {
  addProduct(
    name: string,
    price: number,
    stock: number,
    description: string,
    imageUrl: string,
    categoryId: string,
    sellerId: string,
    expirationDate: string
  ): Promise<ProductResponseEntity>;

  getProducts(sellerId: string): Promise<ProductResponseEntity[]>;
}
