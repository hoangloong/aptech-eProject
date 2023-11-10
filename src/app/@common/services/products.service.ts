import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, ProductReview } from '../types/product.type';

export interface ProductQueryParams {
  product_name?: string;
  categories?: string;
  created_date?: 'asc' | 'desc';
  paging: number;
  page_size: number;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private _http: HttpClient) {}

  getProducts(queryParams: ProductQueryParams): Observable<Product[]> {
    return this._http.get<Product[]>(`${environment.apiUrl}products`, {
      params: { ...queryParams },
    });
  }

  getProductById(id: number) {
    return this._http.get<Product>(`${environment.apiUrl}products/${id}`);
  }

  postReview(body: Partial<ProductReview>) {
    return this._http.post<ProductReview>(`${environment.apiUrl}reviews`, {
      ...body,
    });
  }
}
