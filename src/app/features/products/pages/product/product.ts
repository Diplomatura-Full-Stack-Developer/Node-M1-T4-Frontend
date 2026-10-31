import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { DiscountPipe } from '../../../../shared/pipes/discount.pipe';
import { ICartProduct } from '../../interfaces/product.interface';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../users/services/user.service';
@Component({
  selector: 'app-product',
  imports: [MatButtonModule, MatCardModule, CurrencyPipe, DiscountPipe, MatIconModule],
  templateUrl: './product.html',
})
export class Product {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  error = this.productService.error;
  userService = inject(UserService);

  session = toSignal(this.userService.session$, { initialValue: undefined });

  isLogged = computed(() => this.session() !== undefined);

  private productId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
  );

  product = computed(() => {
    const id = this.productId();
    if (!id) {
      return undefined;
    }
    return this.productService.getProductById(id);
  });


  ngOnInit(): void {
    this.productService.seedProducts();
  }

  availableStock = computed(() => {
    const current = this.product();
    if (!current) {
      return 0;
    }
    const inCart = this.productService.cart().find((item) => item.id === current.id);
    return current.stock - (inCart?.quantity ?? 0);
  });

  canAddToCart = computed(() => this.availableStock() > 0);


  addProductToCart(id: string): void {
    this.productService.addProductToCart(this.product() as ICartProduct);
    this.router.navigate(['/products-cart']);
  }
}
export default Product;
