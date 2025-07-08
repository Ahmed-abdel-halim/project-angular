import { Component, OnInit } from '@angular/core';
import { ProductlistComponent } from '../product-list/product-list.component';

import { ProdectserviceService } from '../../services/prodectservice.service';
import { Product } from '../../data/product';
import { AuthService } from '../../services/auth.service'; 
@Component({
  selector: 'app-cart',
  imports: [ProductlistComponent],
 
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartList: Product[] = [];
  totalAmount: number = 0;
  userId: string = '';

  constructor(
    private productService: ProdectserviceService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.productService.cartItems.subscribe((data) => {
      this.cartList = data;
      this.calculateTotalAmount();
    });

    this.productService.loadCart();
  }
  removeItem(item: Product) {
    this.productService.removeFromCart(item);
  }

  increaseQuantity(product: Product) {
    if (!product.quantity) product.quantity = 1;
    product.quantity++;
    this.calculateTotalAmount();
  }

  decreaseQuantity(product: Product) {
    if (product.quantity && product.quantity > 1) {
      product.quantity--;
      this.calculateTotalAmount();
    }
  }

  calculateTotalAmount() {
    this.totalAmount = this.cartList.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
  }
}
