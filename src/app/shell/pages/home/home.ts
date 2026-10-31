import { Component, inject } from '@angular/core';
import { ProductCard } from '../../../features/products/pages/ui/product-card/product-card';
import { OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../features/products/services/product.service';
import { computed } from '@angular/core';
import { signal } from '@angular/core';
@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCard],
  templateUrl: './home.html',
})
export class Home implements OnInit {

  private productService = inject(ProductService);

  error = this.productService.error;

  products = computed(() =>
    this.productService.products().filter((p) => !p.deleted),
  );

  ngOnInit(): void {
    this.productService.seedProducts();
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
