import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { Product } from '../../data/product';
import { ProdectserviceService } from '../../services/prodectservice.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductlistComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProdectserviceService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const searchTerm = params['search'] || '';
      const categoryId = params['category_id'] || '';
      this.loadProducts(searchTerm, categoryId);
    });
  }
    loadProducts(searchTerm: string, categoryId: string): void {
    if (searchTerm || categoryId) {
      this.productService.getProductsByFilters(searchTerm, categoryId).subscribe({
        next: (products) => this.products = products,
        error: (err) => {
          console.error('Error loading filtered products:', err);
          this.products = [];
        }
      });
    } else {
      this.productService.getAllProduct().subscribe({
        next: (products) => this.products = products,
        error: (err) => {
          console.error('Error loading all products:', err);
          this.products = [];
        }
      });
    }
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }


}
