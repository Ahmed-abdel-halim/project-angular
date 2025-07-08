import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../data/product';

@Injectable({
  providedIn: 'root',
})
export class ProdectserviceService {
  private apiUrl = 'https://api.example.com/products'; // غيره حسب API

  constructor(private http: HttpClient) {}

  getProductsByFilters(filters: {
    brand?: string;
    price_min?: number;
    price_max?: number;
    category_id?: number;
  }): Observable<Product[]> {
    let queryParams: string[] = [];

    if (filters.brand) {
      queryParams.push(`brand=${encodeURIComponent(filters.brand)}`);
    }
    if (filters.price_min != null) {
      queryParams.push(`price_min=${filters.price_min}`);
    }
    if (filters.price_max != null) {
      queryParams.push(`price_max=${filters.price_max}`);
    }
    if (filters.category_id != null) {
      queryParams.push(`category_id=${filters.category_id}`);
    }

    const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';
    return this.http.get<Product[]>(this.apiUrl + queryString);
  }
}
