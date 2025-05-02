import { ProductEntity } from "../entities/Product-entity";
import { ProductServicePort } from "../ports/Product-port";

export class ProductUseCases {
  constructor(private productService: ProductServicePort) {}

  async fetchAll(sellerId: string): Promise<ProductEntity[]> {
    return this.productService.getProducts(sellerId);
  }

  async toggleStatus(productId: string): Promise<ProductEntity> {
    return this.productService.changeStatus(productId);
  }

  async filter(sellerId: string, status: "ENABLED" | "DISABLED"): Promise<ProductEntity[]> {
    return this.productService.filterByStatus(sellerId, status);
  }

  async search(name: string, sellerId: string): Promise<ProductEntity[]> {
    return this.productService.searchProducts(name, sellerId);
  }
}
