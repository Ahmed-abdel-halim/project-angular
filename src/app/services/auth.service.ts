import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private usernameSubject = new BehaviorSubject<string | null>(null);
  public username$ = this.usernameSubject.asObservable();

  private authStatusSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatusSubject.asObservable();

updateAuthStatus(): void {
  this.authStatusSubject.next(this.isAuthenticated());
}
  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('auth_token');
    const name = localStorage.getItem('username');

    if (token) {
      this.tokenSubject.next(token);
    }
    if (name) {
      this.usernameSubject.next(name);
    }

    this.authStatusSubject.next(!!token);
  }

  register(userData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  login(credentials: { email: string; password: string }): Observable<{ token: string; user: { id: number; name: string } }> {
    return this.http.post<{ token: string; user: { id: number; name: string } }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.storeToken(response.token);
        this.storeUsername(response.user.name);
        localStorage.setItem('user_id', response.user.id.toString());
        this.authStatusSubject.next(true);
        this.updateAuthStatus();
      })
    );
  }

  private storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
    this.tokenSubject.next(token);
  }

  private storeUsername(name: string): void {
    localStorage.setItem('username', name);
    this.usernameSubject.next(name);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getUsername(): string | null {
    return this.usernameSubject.value;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    this.tokenSubject.next(null);
    this.usernameSubject.next(null);
    this.authStatusSubject.next(false);
    this.router.navigate(['/login']);
  }
}
