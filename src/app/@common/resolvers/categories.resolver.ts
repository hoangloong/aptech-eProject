import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../types/category.type';
import { Observable, finalize } from 'rxjs';
import { SplashScreenService } from '../services/splash-screen.services';

@Injectable({ providedIn: 'root' })
export class CategoriesResolver implements Resolve<Category[]> {
  constructor(
    private _categories: CategoriesService,
    private _splashScreen: SplashScreenService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Category[]> | Promise<Category[]> | Category[] {
    return this._categories
      .getCategories()
      .pipe(finalize(() => this._splashScreen.stop()));
  }
}
