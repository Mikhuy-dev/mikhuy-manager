// src/core/storage/ports/product-service-port.ts
import { StorageEntity } from "../entities/Storage-entity";

export interface StorageServicePort {
  getProducts(sellerId: string): Promise<StorageEntity[]>;
  changeStatus(productId: string): Promise<StorageEntity>;
  filterByStatus(sellerId: string, status: "ENABLED" | "DISABLED"): Promise<StorageEntity[]>;
  searchProducts(name: string, sellerId: string): Promise<StorageEntity[]>;
}
