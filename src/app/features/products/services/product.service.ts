import { inject, Service, signal } from '@angular/core';
import { ICartProduct, IProduct } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';



@Service()
export class ProductService {

  private apiUrl = 'data/products.json';

  private http = inject(HttpClient);

  private persist(): void {
    localStorage.setItem('products', JSON.stringify(this.products()));
    localStorage.setItem('cart', JSON.stringify(this.cart()));
  }

  products = signal<IProduct[]>([]);
  cart = signal<ICartProduct[]>([]);

  private readonly _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  seedProducts(): void {
    const stored = localStorage.getItem('products');
    if (stored !== null) {
      this.products.set(JSON.parse(stored) as IProduct[]);
      return;
    }

    this.http.get<IProduct[]>(this.apiUrl).pipe(
      catchError((error) => {
        this._error.set(`Error loading products: ${error.message}`);
        return of([]);
      }),
    ).subscribe((data) => {
      if (data.length === 0 && this._error()) {
        return;
      }
      const withIds = data.map((p) => ({ ...p, id: crypto.randomUUID(), createdAt: new Date(), deleted: false }));
      this.products.set(withIds);
      this._error.set(null);
      this.persist();
    });
  }

  getProductById(id: string): IProduct | undefined {
    return this.products().find((p) => p.id === id);
  }

  addProduct(product: IProduct): void {
    try {
      this.products.update((list) => [...list, product]);
      this.persist();
    } catch (error) {
      this._error.set(`Error adding product: ${error as string}`);
    }
  }

  deleteProduct(id: string): void {
    try {
      this.products.update((list) =>
        list.map((p) => (p.id === id ? { ...p, deleted: true } : p)),
      );
      this.persist();
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
    this.persist();
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
    this.persist();
  }
  searchProducts(search: string) {
    return this.products().filter((p) => p.category.toLowerCase().includes(search.toLowerCase()));
  }


  totalQuantityInCart(): number {
    return this.cart().reduce((acc, product) => acc + (product as ICartProduct).quantity, 0);
  }

}
