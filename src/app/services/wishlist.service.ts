import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface WishlistItem {
  wishlist_id: number;
  product_id: number;
  name: string;
  price: number;
  rating?: number;
  image_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:3000/wishlist';

  private wishlistSubject = new BehaviorSubject<WishlistItem[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();



  constructor(private http: HttpClient) {
    this.loadWishlist();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getWishlist(): Observable<WishlistItem[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<WishlistItem[]>(this.apiUrl, { headers });
  }

loadWishlist(): void {
  this.getWishlist().subscribe({
    next: (items) => this.wishlistSubject.next(items),
    error: () => this.wishlistSubject.next([]),
  });
}

addToWishlist(productId: number): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.post(`${this.apiUrl}/add`, { product_id: productId }, { headers }).pipe(
    tap(() => this.loadWishlist())
  );
}

removeFromWishlist(productId: number): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.delete(`${this.apiUrl}/${productId}`, { headers }).pipe(
    tap(() => this.loadWishlist())
  );
}
}
