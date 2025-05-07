export interface ProductEntity {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  categoryId: string;
  sellerId: string;
  expirationDate: string;
  status: string;
}
