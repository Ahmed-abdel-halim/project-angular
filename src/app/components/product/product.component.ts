import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../data/product';
import { ProdectserviceService } from '../../services/prodectservice.service';
import { WishlistService } from '../../services/wishlist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  Math = Math;
  @Input() product!: Product;

  constructor(
    private router: Router,
    private productt: ProdectserviceService,
    private wishlistService: WishlistService
  ) {}

  get stockStatus() {
    return this.product.stock_quantity > 10 ? '30%' : '10%';
  }

  get stockClass() {
    return this.product.stock_quantity > 0 ? 'bg-warning' : 'bg-danger';
  }
addToCart(product: Product) {
  this.productt.addToCart(product);
}

  showdetails(id: number) {
    this.router.navigate(['/showdetails', id]);
  }

  goToWishlist() {
    this.router.navigate(['/wishlist']);
  }

addToWishlist(): void {
  this.wishlistService.addToWishlist(this.product.id).subscribe({
    next: () => alert(' Product added to wishlist successfully'),
    error: (err) => {
      console.error(' Failed to add product:', err);
      alert('The product is already in the favorites.');
    }
  });
}
  showDetails(id: number) {

  this.router.navigate(['/showdetails', id]);
}
}
