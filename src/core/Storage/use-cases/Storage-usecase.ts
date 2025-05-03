import { StorageEntity } from "../entities/Storage-entity";
import { StorageServicePort } from "../ports/Storage-port";

export class StoragetUseCases {
  constructor(private StorageService: StorageServicePort) {}

  async fetchAll(sellerId: string): Promise<StorageEntity[]> {
    return this.StorageService.getProducts(sellerId);
  }

  async toggleStatus(productId: string): Promise<StorageEntity> {
    return this.StorageService.changeStatus(productId);
  }

  async filter(sellerId: string, status: "ENABLED" | "DISABLED"): Promise<StorageEntity[]> {
    return this.StorageService.filterByStatus(sellerId, status);
  }

  async search(name: string, sellerId: string): Promise<StorageEntity[]> {
    return this.StorageService.searchProducts(name, sellerId);
  }
}
