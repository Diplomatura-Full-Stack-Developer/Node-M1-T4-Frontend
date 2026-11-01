import { inject, Service, signal } from '@angular/core';
import { ICartProduct, IProduct } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';



@Service()
export class ProductService {

  private apiUrl = 'http://localhost:3000';

  private http = inject(HttpClient);


  products = signal<IProduct[]>([]);
  cart = signal<ICartProduct[]>([]);

  private readonly _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  private toProduct(raw: IProduct & { _id?: string }): IProduct {
    return {
      ...raw,
      id: raw.id ?? String(raw._id),
    };
  }

  getProducts(): void {
    this.http
      .get<Array<IProduct & { _id?: string }>>(`${this.apiUrl}/products`)
      .pipe(
        catchError((error: { message: string }) => {
          this._error.set(`Error loading products: ${error.message}`);
          return of([]);
        }),
      )
      .subscribe((data) => {
        this.products.set(data.map((item) => this.toProduct(item)));
      });
  }

  getProductById(id: string): void {
    this.http
      .get<{ message: string; data: IProduct & { _id?: string } }>(
        `${this.apiUrl}/products/${id}`,
      )
      .pipe(
        catchError((error: { message: string }) => {
          this._error.set(`Error loading product: ${error.message}`);
          return of(null);
        }),
      )
      .subscribe((response) => {
        const raw = response?.data;
        this.products.set(raw ? [this.toProduct(raw)] : []);
      });
  }
  addProduct(product: IProduct): void {
    try {
      this.products.update((list) => [...list, product]);
    } catch (error) {
      this._error.set(`Error adding product: ${error as string}`);
    }
  }

  deleteProduct(id: string): void {
    try {
      this.products.update((list) =>
        list.map((p) => (p.id === id ? { ...p, deleted: true } : p)),
      );
    } catch (error) {
      this._error.set(`Error deleting product: ${error as string}`);
    }
  }

  addProductToCart(product: IProduct): void {
    const catalog = this.products().find((item) => item.id === product.id);
    if (!catalog || catalog.stock <= 0) {
      return;
    }

    const inCart = this.cart().find((item) => item.id === product.id);

    if (inCart) {
      if (inCart.stock <= 0) {
        return;
      }
      this.cart.update((list) =>
        list.map((item) =>
          item.id === product.id
            ? { ...item, stock: item.stock - 1, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      this.cart.update((list) => [
        ...list,
        { ...catalog, stock: catalog.stock - 1, quantity: 1 },
      ]);
    }
  }


  removeProductFromCart(id: string): void {
    this.cart.update((list) =>
      list
        .map((item) =>
          item.id === id
            ? { ...item, stock: item.stock + 1, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }
  searchProducts(search: string) {
    return this.products().filter((p) => p.category.toLowerCase().includes(search.toLowerCase()));
  }


  totalQuantityInCart(): number {
    return this.cart().reduce((acc, product) => acc + (product as ICartProduct).quantity, 0);
  }

}
