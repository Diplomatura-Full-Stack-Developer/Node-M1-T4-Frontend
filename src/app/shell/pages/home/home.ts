import { Component, inject } from '@angular/core';
import { ProductCard } from '../../../features/products/pages/ui/product-card/product-card';
import { OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../features/products/services/product.service';
import { computed } from '@angular/core';
import { signal } from '@angular/core';
import { Skeleton } from '../../../shared/ui/skeleton/skeleton/skeleton';
@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCard, Skeleton],
  templateUrl: './home.html',
})
export class Home implements OnInit {

  private productService = inject(ProductService);

  error = this.productService.error;

  products = computed(() =>
    this.productService.products().filter((p) => !p.deleted),
  );

  isLoading = computed(() => this.productService.isLoading());

  ngOnInit(): void {
    this.productService.getProducts();
  }


  searchTerm = signal('');

  filteredProducts = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();

    return this.products().filter((product) =>
      product.category.toLowerCase().includes(term),
    );
  });

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }
}

export default Home;
