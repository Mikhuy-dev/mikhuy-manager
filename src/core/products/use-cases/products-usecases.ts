import { ProductResponseEntity } from "../entities/productResponse-entity";
import { ProductServicePort } from "../ports/product-service-port";

export class ProductUseCases {
  constructor(private productService: ProductServicePort) {}

  async executeAddProduct(
    name: string,
    price: number,
    stock: number,
    description: string,
    categoryId: string,
    sellerId: string,
    image: File | null
  ): Promise<ProductResponseEntity> {
    const result = await this.productService.addProduct(
      name,
      price,
      stock,
      description,
      categoryId,
      sellerId,
      image
    );
    return result;
  }
}
