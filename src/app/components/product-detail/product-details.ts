import { Component, inject, input, numberAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss']
})
export class ProductDetailComponent {
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);

  // Signal-based input with route parameter binding (requires withComponentInputBinding)
  id = input.required<number, string>({ transform: numberAttribute });

  // httpResource that automatically reloads when id signal changes - URL from service
  productResource = httpResource<Product>(() => this.productService.getProductUrl(this.id()));

  goBack(): void {
    this.router.navigate(['/']);
  }
}
