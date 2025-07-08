import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../data/category';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/api/categories');
  }
}
