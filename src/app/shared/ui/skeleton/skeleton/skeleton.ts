import { Component, Input } from '@angular/core';

export type SkeletonVariant = 'product' | 'cart';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.html',
  host: {
    class: 'block w-full',
  },
})
export class Skeleton {
  @Input() variant: SkeletonVariant = 'product';
}
