export interface ProductResponseEntity {
  id: string;
  name: string;
  price: string;
  stock: number;
  description: string;
  imageUrl: string;
  categoryId: string;
  sellerId: string;
  expirationDate: string;
  status: string;
}

export interface ProductApiError {
  message: string;
  statusCode: number;
}