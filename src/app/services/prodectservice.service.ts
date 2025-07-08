import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductDetailsResponse } from '../data/reviews';
import { Product } from '../data/product';

@Injectable({
  providedIn: 'root',
})
export class ProdectserviceService {
  private cart = new BehaviorSubject<Product[]>([]);
  public cartItems = this.cart.asObservable();
  private baseUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Token not found. Please make sure you are logged in.');
    }
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  loadCart(): void {
    const headers = this.getAuthHeaders();
    this.http.get<Product[]>(`${this.baseUrl}`, { headers }).subscribe({
      next: (items) => this.cart.next(items),
      error: (err) => console.error('Error loading cart:', err),
    });
  }

  addToCart(product: Product): void {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert('You must be logged in to add a product to the cart.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const payload = {
      product_id: product.id,
      quantity: 1,
    };

    this.http.post(`${this.baseUrl}/add`, payload, { headers }).subscribe({
      next: () => {
        alert('Product added to cart successfully.');
        this.loadCart();
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        alert('An error occurred while adding the product to the cart.');
      },
    });
  }

  removeFromCart(product: Product): void {
    const headers = this.getAuthHeaders();

    if (!product.cart_item_id) {
      alert('Cannot remove product. Cart item ID is missing.');
      return;
    }

    this.http.delete(`${this.baseUrl}/${product.cart_item_id}`, { headers }).subscribe({
      next: () => {
        alert('🗑️ Product removed from cart.');
        this.loadCart();
      },
      error: (err) => {
        console.error('Error removing product from cart:', err);
        alert('An error occurred while removing the product from the cart.');
      },
    });
  }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/api/products`);
  }

  getProductById(id: number): Observable<ProductDetailsResponse> {
    return this.http.get<ProductDetailsResponse>(`http://localhost:3000/api/products/${id}`);
  }


getProductsByFilters(searchTerm: string, categoryId: string): Observable<Product[]> {
  let url = 'http://localhost:3000/api/products';
  const params: string[] = [];

  if (searchTerm) params.push(`brand=${encodeURIComponent(searchTerm)}`);
  if (categoryId) params.push(`category_id=${encodeURIComponent(categoryId)}`);

  if (params.length > 0) {
    url += '?' + params.join('&');
  }

  return this.http.get<Product[]>(url);
}

}
