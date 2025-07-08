import { Routes } from '@angular/router';
import { ProductlistComponent } from './components/product-list/product-list.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { ShowdetilsComponent } from './components/showdetils/showdetils.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { RegisterComponent1 } from './register1/register1.component';

export const routes: Routes = [
  { path: 'home',  component: ProductlistComponent , title: 'Home Page' },
  { path: 'login', component: LoginComponent, title: 'Login Page' },
  { path: 'showdetails/:id', component: ShowdetilsComponent },
  { path: 'cart', component: CartComponent, title: 'Cart Page' },
  { path: 'wishlist', component: WishlistComponent, title: 'Wishlist Page' },
  { path: 'register', component: RegisterComponent1, title: 'Register Page' },
  { path: 'about', component: AboutComponent, title: 'About Page' },
  { path: 'contact', component: ContactComponent, title: 'Contact Page' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];
