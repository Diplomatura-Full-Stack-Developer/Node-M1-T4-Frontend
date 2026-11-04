import { IProduct } from "../../products/interfaces/product.interface";
import { computed, signal } from "@angular/core";
import { inject } from "@angular/core";
import { ICartProduct } from "../interfaces/cart.interface";
import { HttpClient } from "@angular/common/http";
import { Service } from "@angular/core";
import { IUser } from "../../users/interfaces/user.interface";
import { UserService } from "../../users/services/user.service";
import { Router } from "@angular/router";

@Service()
export class CartService {

  private readonly http = inject(HttpClient);
  private userService = inject(UserService);
  private router = inject(Router);

  private apiUrl = 'http://localhost:3000';
  user = computed(() => this.userService.user() as unknown as IUser | null);

  userCart = signal<{ cartId: string, products: ICartProduct[], total: number, userId: string }>({ cartId: '', products: [], total: 0, userId: this.user()?._id as unknown as string });

  productsCart = signal<ICartProduct[]>([]);

  getUserCart(): void {
    const userId = this.user()?._id;
    if (!userId) {
      this.productsCart.set([]);
      return;
    }

    this.http.get<{ cartId: string; products: { productId: string; quantity: number }[]; total: number }>(
      `${this.apiUrl}/cart/${userId}`,
    ).subscribe({
      next: (res) => {
        const lines = res.products ?? [];
        this.userCart.set({
          cartId: res.cartId ?? '',
          products: [],
          total: res.total ?? 0,
          userId,
        });
        if (lines.length === 0) {
          this.productsCart.set([]);
          return;
        }
        this.loadProducts(lines);
      },
      error: () => {
        this.productsCart.set([]);
      },
    });
  }

  private loadProducts(cartItems: { productId: string; quantity: number }[]): void {
    this.productsCart.set([]);
    cartItems.forEach((cartItem) => {
      this.http.get<{ data: IProduct }>(`${this.apiUrl}/products/${cartItem.productId}`).subscribe({
        next: (res) => {
          const item: ICartProduct = { ...res.data, id: res.data.id ?? cartItem.productId, quantity: cartItem.quantity };
          this.productsCart.update((current) => [...current, item]);
        },
      });
    });
  }


  addProductToCart(userId: string, productId: string): void {

    if (this.userCart().cartId !== '') {
      this.http.post(`${this.apiUrl}/cart/${this.userCart().cartId}/products`, { productId }).subscribe((res: any) => {
        this.userCart.set({ cartId: res.cartId, products: res.products, total: res.total, userId: this.user()?._id as unknown as string });
        this.router.navigate(['/products-cart']);
      });
    }
    else {
      this.http.post(`${this.apiUrl}/cart`, { userId: this.user()?._id as unknown as string, productId: productId }).subscribe((res: any) => {
        this.userCart.set({ cartId: res.cartId, products: res.products, total: res.total, userId: this.user()?._id as unknown as string });
        this.router.navigate(['/products-cart']);
      });
    }
  }


  removeProductFromCart(productId: string): void {
    const cartId = this.userCart().cartId;
    this.http
      .delete(`${this.apiUrl}/cart/${cartId}/products/${productId}`)
      .subscribe(() => {
        this.getUserCart();
      });
  }
}

