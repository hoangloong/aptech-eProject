import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../types/category.type';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriesResolver implements Resolve<Category[]> {
  constructor(private _categories: CategoriesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Category[]> | Promise<Category[]> | Category[] {
    return this._categories.getCategories();
  }
}
