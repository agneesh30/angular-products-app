import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductListComponent {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  healthStatus = signal('');

  // Use httpResource for reactive data fetching - URL from service
  productsResource = httpResource<Product[]>(() => this.productService.getProductsUrl());

  constructor() {
    this.checkHealth();
  }

  checkHealth(): void {
    this.productService.checkHealth().subscribe({
      next: (response) => this.healthStatus.set('Backend is healthy ✅'),
      error: () => this.healthStatus.set('Backend connection failed ❌')
    });
  }

  viewProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }

  refresh(): void {
    this.productsResource.reload();
  }
}
