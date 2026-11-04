import { Component, signal } from '@angular/core';
import { inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { DiscountPipe } from '../../../../shared/pipes/discount.pipe';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../users/services/user.service';
import { CartService } from '../../../cart/services/cart.service';
import { IUser } from '../../../users/interfaces/user.interface';

@Component({
  selector: 'app-product',
  imports: [MatButtonModule, MatCardModule, CurrencyPipe, DiscountPipe, MatIconModule],
  templateUrl: './product.html',
})
export class Product {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  error = signal<string | null>(null);

  user = computed(() => this.userService.user() as unknown as IUser | null);
  products = computed(() => this.productService.products());
  product = computed(() => this.products().find((item) => item.id === this.route.snapshot.paramMap.get('id')));



  addProductToCart(userId: string): void {
    this.cartService.addProductToCart(userId, this.product()?.id as unknown as string);

  }

}
export default Product;
