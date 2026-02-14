import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

// Replace with your actual backend URL from Cloud Run
const API_URL = 'https://demo-app-149056105851.us-central1.run.app/api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${API_URL}/products`;

  // URL getters for httpResource usage in components
  getProductsUrl(): string {
    return this.apiUrl;
  }

  getProductUrl(id: number): string {
    return `${this.apiUrl}/${id}`;
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  checkHealth(): Observable<String> {
    return this.http.get<String>(`${this.apiUrl}/health`,{ responseType: 'text' as 'json' });
  }
}
