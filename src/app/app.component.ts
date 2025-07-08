import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ProductlistComponent } from './components/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { NNavbarComponent } from './components/n-navbar/n-navbar.component';
import { RegisterComponent1 } from './register1/register1.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RegisterComponent1,
    ProductlistComponent,
    ProductComponent,
    CommonModule,
    NNavbarComponent

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'lab4';
}
