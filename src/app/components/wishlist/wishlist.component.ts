import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WishlistService, WishlistItem } from '../../services/wishlist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishlist: WishlistItem[] = [];
  errorMessage = '';
  wishlistCount: number = 0;

  private subscriptions = new Subscription();

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.wishlistService.wishlist$.subscribe({
        next: (items) => {
          this.wishlist = items;
          this.errorMessage = items.length === 0 ? 'No items in wishlist.' : '';
        },
        error: () => {
          this.errorMessage = 'Failed to load wishlist.';
        }
      })
    );

  }

  removeFromWishlist(productId: number): void {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: () => {
        this.errorMessage = '';
        alert("Product removed from wishlist.")
      },
      error: () => {
        this.errorMessage = 'Failed to remove item.';
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
