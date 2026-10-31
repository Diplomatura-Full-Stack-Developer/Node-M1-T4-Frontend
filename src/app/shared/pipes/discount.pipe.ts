import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  transform(price: number, discount: number): number {
    return price - (price * discount / 100);
  }
}
