import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../types/product.type';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private _http: HttpClient) {}

  getProducts(categoryIds?: number[]): Observable<Product[]> {
    let params = new HttpParams().set(
      'categories',
      categoryIds?.toString() || ''
    );
    return this._http.get<Product[]>(`${environment.apiUrl}products`, {
      params,
    });
  }

  getProductById(id: number) {
    return this._http.get<Product>(`${environment.apiUrl}products/${id}`);
  }
}
