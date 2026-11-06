import { inject, Service, signal } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Service()
export class ProductService {

  private apiUrl = environment.apiUrl;

  private http = inject(HttpClient);


  products = signal<IProduct[]>([]);

  isLoading = signal<boolean>(false);

  private readonly _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  private toProduct(raw: IProduct & { _id?: string }): IProduct {
    return {
      ...raw,
      id: raw.id ?? String(raw._id),
    };
  }

  getProducts(): void {
    this.isLoading.set(true);
    this.http
      .get<Array<IProduct & { _id?: string }>>(`${this.apiUrl}/products`)
      .pipe(
        catchError((error: { message: string }) => {
          this._error.set(`Error loading products: ${error.message}`);
          this.isLoading.set(false);
          return of([]);
        }),
      )
      .subscribe((data) => {
        this.products.set(data.map((item) => this.toProduct(item)));
        this.isLoading.set(false);
      });
  }

  getProductById(id: string): void {
    this.isLoading.set(true);
    this.http
      .get<{ message: string; data: IProduct & { _id?: string } }>(
        `${this.apiUrl}/products/${id}`,
      )
      .pipe(
        catchError((error: { message: string }) => {
          this._error.set(`Error loading product: ${error.message}`);
          this.isLoading.set(false);
          return of(null);
        }),
      )
      .subscribe((response) => {
        const raw = response?.data;
        this.products.set(raw ? [this.toProduct(raw)] : []);
        this.isLoading.set(false);
      });
  }


  addProduct(product: IProduct): void {
    this.http.post<IProduct & { _id?: string }>(`${this.apiUrl}/product`, product)
      .pipe(
        catchError((error: { message: string }) => {
          this._error.set(`Error adding product: ${error.message}`);
          return of(null);
        }),
      )
      .subscribe((response) => {
        this.products.set([this.toProduct(response as IProduct & { _id?: string })]);
      });
  }

  deleteProduct(id: string): void {
  }

  searchProducts(search: string) {
    return this.products().filter((p) => p.category.toLowerCase().includes(search.toLowerCase()));
  }

}
