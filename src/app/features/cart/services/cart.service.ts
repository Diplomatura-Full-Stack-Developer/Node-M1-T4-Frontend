import { IProduct } from "../../products/interfaces/product.interface";
import { ProductService } from "../../products/services/product.service";
import { signal } from "@angular/core";
import { inject } from "@angular/core";
import { ICartProduct } from "../interfaces/cart.interface";
import { HttpClient } from "@angular/common/http";
import { Service } from "@angular/core";
import { IUser } from "../../users/interfaces/user.interface";


@Service()
export class CartService {

  private readonly http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  private products = inject(ProductService);
  private cart = signal<IProduct[]>([]);





  addProductToCart(product: IProduct, quantity: number, user: string): void {


    // console.log(product, quantity, user);
    // const catalog = this.products().find((item) => item.id === product.id);
    // if (!catalog || catalog.stock <= 0) {
    //   return;
    // }

    // const inCart = this.cart().find((item) => item.id === product.id);

    // if (inCart) {
    //   if (inCart.stock <= 0) {
    //     return;
    //   }
    //   this.cart.update((list) =>
    //     list.map((item) =>
    //       item.id === product.id
    //         ? { ...item, stock: item.stock - 1, quantity: item.quantity + 1 }
    //         : item,
    //     ),
    //   );
    // } else {
    //   this.cart.update((list) => [
    //     ...list,
    //     { ...catalog, stock: catalog.stock - 1, quantity: 1 },
    //   ]);
    // }
  }


  removeProductFromCart(id: string): void {
    // this.cart.update((list) =>
    //   list
    //     .map((item) =>
    //       item.id === id
    //         ? { ...item, stock: item.stock + 1, quantity: item.quantity - 1 }
    //         : item,
    //     )
    //     .filter((item) => item.quantity > 0),
    // );
  }

  totalQuantityInCart(): number {
    return this.cart().reduce((acc, product) => acc + (product as ICartProduct).quantity, 0);
  }




}

