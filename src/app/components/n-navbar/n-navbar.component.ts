import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../data/product';
import { ProdectserviceService } from '../../services/prodectservice.service';
import { WishlistItem, WishlistService } from '../../services/wishlist.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../data/category';
import { CategoryService } from '../../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-n-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './n-navbar.component.html',
  styleUrls: ['./n-navbar.component.css']
})
export class NNavbarComponent implements OnInit, OnDestroy {
  cartItemList: Product[] = [];
  wishlist: WishlistItem[] = [];

  username: string | null = null;
  searchTerm: string = '';
  selectedCategoryId: string = '';
  categories: Category[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private productService: ProdectserviceService,
    private authService: AuthService,
    private wishlistService: WishlistService,
    private router: Router,
    private categoryService: CategoryService,
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.productService.cartItems.subscribe(data => {
        this.cartItemList = data;
      })
    );

    this.subscriptions.add(
      this.wishlistService.wishlist$.subscribe({
        next: (items) => {
          this.wishlist = items;
        },
        error: (err) => {
          console.error('Error loading wishlist in navbar:', err);
          this.wishlist = [];
        }
      })
    );  this.wishlistService.loadWishlist();


    this.productService.loadCart();
    this.wishlistService.loadWishlist();

    this.username = this.authService.getUsername();

    this.categoryService.getAllCategories().subscribe({
      next: (cats) => this.categories = cats,
      error: (err) => console.error('Error loading categories:', err)
    });

    this.subscriptions.add(
      this.authService.authStatus$.subscribe(isLoggedIn => {
        this.username = this.authService.getUsername();
        this.productService.loadCart();
        this.wishlistService.loadWishlist();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.wishlist = [];
    this.cartItemList = [];
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/home'], { queryParams: { search: this.searchTerm.trim() } });
    }
  }

  applyFilters(): void {
    const queryParams: any = {};
    if (this.searchTerm.trim()) queryParams.search = this.searchTerm.trim();
    if (this.selectedCategoryId) queryParams.category_id = this.selectedCategoryId;

    this.router.navigate(['/home'], { queryParams });
  }
}
