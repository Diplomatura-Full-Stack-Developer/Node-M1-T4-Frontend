import { Component, inject } from '@angular/core';
import { ProductService } from '../../../products/services/product.service';
import { CurrencyPipe } from '@angular/common';
import { computed } from '@angular/core';

@Component({
  selector: 'app-products-cart',
  imports: [CurrencyPipe],
  templateUrl: './products-cart.html',
})
export default class ProductsCart {

  private productService = inject(ProductService);

  products = computed(() => this.productService.products());

  ngOnInit(): void {
    this.productService.getProducts();

  }

  // removeProductFromCart(id: string): void {
  //   this.productService.removeProductFromCart(id);
  // }

}
