export interface IProduct {
  id: string;
  deleted: boolean;
  category: string;
  brand: string;
  model: string;
  price: number;
  offer: boolean;
  discount: number;
  stock: number;
  imageUrl: string;
  features: string[];
  createdAt: Date;
}

export interface ICartProduct extends IProduct {
  quantity: number;
}
