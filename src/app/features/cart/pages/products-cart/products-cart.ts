import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { computed } from '@angular/core';
import { UserService } from '../../../users/services/user.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-products-cart',
  imports: [CurrencyPipe, MatIconModule],
  templateUrl: './products-cart.html',
})
export default class ProductsCart {

  private cartService = inject(CartService);
  private user = inject(UserService);

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
