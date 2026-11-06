import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { computed } from '@angular/core';
import { UserService } from '../../../users/services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { Skeleton } from '../../../../shared/ui/skeleton/skeleton/skeleton';
@Component({
  selector: 'app-products-cart',
  imports: [CurrencyPipe, MatIconModule, Skeleton],
  templateUrl: './products-cart.html',
})
export default class ProductsCart {

  private user = inject(UserService);

  private cartService = inject(CartService);

  isLoading = computed(() => this.cartService.isLoading());

  products = computed(() => this.cartService.productsCart());


  ngOnInit(): void {
    if (this.user.user()) {
      this.cartService.getUserCart();
    }
  }

  removeProductFromCart(id: string): void {
    this.cartService.removeProductFromCart(id);
  }

}
