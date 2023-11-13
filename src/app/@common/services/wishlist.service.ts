import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Product } from '../types/product.type';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  wishlist$ = new BehaviorSubject<Product[]>(
    JSON.parse(this._cookie.get('wishlist') || '[]')
  );
  constructor(private _cookie: CookieService) {}

  get wishlist(): Product[] {
    return this.wishlist$.getValue();
  }

  addToWishlist(prod: Product) {
    const isExist = this.wishlist.some((e: Product) => e.id === prod.id);
    if (!isExist) {
      const newWishlist = [...this.wishlist, prod];
      this.wishlist$.next(newWishlist);
      this._cookie.set('wishlist', JSON.stringify(newWishlist));
    }
  }

  deleteItem(id: number) {
    const newWishlist = [...this.wishlist.filter((prod) => prod.id !== id)];
    this.wishlist$.next(newWishlist);
    this._cookie.set('wishlist', JSON.stringify(newWishlist));
  }
}
