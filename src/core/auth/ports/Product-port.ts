// src/core/storage/ports/product-service-port.ts
import { ProductEntity } from "../entities/Product-entity";

export interface ProductServicePort {
  getProducts(sellerId: string): Promise<ProductEntity[]>;
  changeStatus(productId: string): Promise<ProductEntity>;
  filterByStatus(sellerId: string, status: "ENABLED" | "DISABLED"): Promise<ProductEntity[]>;
  searchProducts(name: string, sellerId: string): Promise<ProductEntity[]>;
}
