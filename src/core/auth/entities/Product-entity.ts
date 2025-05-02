export interface ProductEntity {
    id: string;
    name: string;
    price: string;
    stock: number;
    description: string;
    imageUrl: string;
    categoryId: string;
    sellerId: string;
    expirationDate: string;
    status: "ENABLED" | "DISABLED";
    notes:string;
  }
  