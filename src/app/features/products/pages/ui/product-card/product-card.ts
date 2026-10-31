import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IProduct } from '../../../interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { DiscountPipe } from '../../../../../shared/pipes/discount.pipe';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, CurrencyPipe, DiscountPipe, RouterLink],
  templateUrl: './product-card.html',
})
export class ProductCard {
  private productService = inject(ProductService);

  @Input() product: IProduct = {} as IProduct;

  error = this.productService.error;


}
