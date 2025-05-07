import { ProductResponseEntity } from "../entities/productResponse-entity";
import { ProductServicePort } from "../ports/product-service-port";

export class ProductUseCases {
  constructor(private productService: ProductServicePort) {}

  async executeAddProduct(
    name: string,
    price: number,
    stock: number,
    description: string,
    imageUrl: string,
    categoryId: string,
    sellerId: string,
    expirationDate: string
  ): Promise<ProductResponseEntity> {
    const result = await this.productService.addProduct(
      name,
      price,
      stock,
      description,
      categoryId,
      sellerId,
      imageUrl,
      expirationDate
    );
    return result;
  }

  async executeGetProducts(
    sellerId: string
  ): Promise<ProductResponseEntity[]> {
    const result = await this.productService.getProducts(sellerId);
    return result;
  }
}
