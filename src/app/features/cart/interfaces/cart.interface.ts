import { IProduct } from "../../products/interfaces/product.interface";


export interface ICartProduct extends IProduct {
  quantity: number;
}
