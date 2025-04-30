export interface ProductEntity {
  name: string;
  price: number;
  stock: number;
  description: string;
  categoryId: string;
  sellerId: string;
  image: File | null;
}
