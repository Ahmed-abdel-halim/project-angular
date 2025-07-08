import { Component, Input } from '@angular/core';
import { Product } from '../../data/product';
import { ProdectserviceService } from '../../services/prodectservice.service';
import { CommonModule } from '@angular/common';
import { Review, ProductDetailsResponse } from '../../data/reviews';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistService,WishlistItem } from '../../services/wishlist.service';


@Component({
  selector: 'app-showdetils',
  imports: [CommonModule,],
  templateUrl: './showdetils.component.html',
  styleUrl: './showdetils.component.css',
})
export class ShowdetilsComponent {
  @Input() id?: string;
  selectedProduct?: Product;
  reviews: Review[] = [];


  constructor(
        private route: ActivatedRoute,
       private productService:ProdectserviceService,
      private wishlists:WishlistService){}
  addToCartFromHome(item: Product |undefined) {
if (item) {
    this.productService.addToCart(item);
  } else {
    console.error("Product is undefined!");
  }  }
  addToWishlistFromHome(item: Product | undefined): void {
  if (item) {
    this.wishlists.addToWishlist(item.id).subscribe({
      next: () => alert(' Product added to wishlist'),
      error: (err) => {
        console.error(' Failed to add to wishlist:', err);
        alert('Error while adding to wishlist');
      }
    });
  } else {
    console.error("Product is undefined!");
  }
}
ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.productService.getProductById(id).subscribe({
    next: (data: ProductDetailsResponse) => {
      this.selectedProduct = data.product;
      this.reviews = data.reviews;
    },
    error: (err) => console.error('Error loading product details', err),
  });
}



  get stockStatus() {
    return (this.selectedProduct?.stock_quantity ?? 0) > 15 ? '30%' : '10%';
  }
  get stockClass() {
    return (this.selectedProduct?.stock_quantity ?? 0) > 10 ? 'bg-warning' : 'bg-warning';
  }
}
