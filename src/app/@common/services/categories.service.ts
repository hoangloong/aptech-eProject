import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../types/category.type';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private _http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(`${environment.apiUrl}categories`);
  }
}
