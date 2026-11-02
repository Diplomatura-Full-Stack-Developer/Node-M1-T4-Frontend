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
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../users/services/user.service';
import { IProduct } from '../../interfaces/product.interface';
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
  error = this.productService.error;


  user = computed(() => this.userService.user() as unknown as IUser | null);

  private productId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
  );

  ngOnInit(): void {
    this.productService.getProductById(this.productId() as string);
  }

  product = computed((): IProduct | undefined => {
    const id = this.productId();
    if (!id) {
      return undefined;
    }
    return this.productService.products().find((item) => item.id === id);
  });

  addProductToCart(product: IProduct, quantity: number, user: string): void {
    console.log(product, quantity, user);
    this.cartService.addProductToCart(product, quantity, user);
  }


  // availableStock = computed(() => {
  //   const current = this.product() as unknown as IProduct;
  //   if (!current) {
  //     return 0;
  //   }
  //   const inCart = this.productService.cart().find((item) => item.id === current.id);
  //   return current.stock - (inCart?.quantity ?? 0);
  // });

  // canAddToCart = computed(() => this.availableStock() > 0);

  // addProductToCart(id: string): void {
  //   this.productService.addProductToCart(this.product() as unknown as ICartProduct);
  //   this.router.navigate(['/products-cart']);
  // }
}
export default Product;
