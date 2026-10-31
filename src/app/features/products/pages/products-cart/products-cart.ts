import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CurrencyPipe } from '@angular/common';
import { computed } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-products-cart',
  imports: [CurrencyPipe, MatIcon],
  templateUrl: './products-cart.html',
})
export default class ProductsCart {

  private productService = inject(ProductService);

  cart = computed(() => this.productService.cart());

  ngOnInit(): void {
    this.productService.seedProducts();

  }

  removeProductFromCart(id: string): void {
    this.productService.removeProductFromCart(id);
  }

}
