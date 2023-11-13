import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { WishlistService } from 'src/app/@common/services/wishlist.service';
import { Product } from 'src/app/@common/types/product.type';

@Component({
  selector: 'app-product-section-item',
  templateUrl: './product-section-item.component.html',
  styleUrls: ['./product-section-item.component.scss'],
})
export class ProductSectionItemComponent implements OnInit {
  @Input({ required: true }) prod!: Product;
  rating = new FormControl(0);
  wishlist: Product[] = [];
  constructor(
    private _router: Router,
    private _wishlist: WishlistService,
    private _msg: MessageService
  ) {
    _wishlist.wishlist$.subscribe((res) => (this.wishlist = res));
  }

  get isDiscount() {
    return this.prod.productAttributes.some((item) => item.discountPercent);
  }

  get isExistWishlist() {
    return this.wishlist.some((item) => item.id === this.prod.id);
  }

  ngOnInit(): void {
    this.rating.setValue(this.calcRate(this.prod));
  }

  calcRate(prod: Product) {
    return prod && prod.reviews.length
      ? prod.reviews.reduce((a, v) => a + v.rate, 0) / prod.reviews.length
      : 0;
  }

  getMinPrice(prod: Product) {
    const sortedByPrice = prod.productAttributes.sort(
      (a, b) => a.discountPrice - b.discountPrice
    );
    return sortedByPrice[0].discountPrice;
  }

  getMaxPrice(prod: Product) {
    const sortedByPrice = prod.productAttributes.sort(
      (a, b) => a.discountPrice - b.discountPrice
    );
    return sortedByPrice[sortedByPrice.length - 1].discountPrice;
  }

  getMaxOriginPrice(prod: Product) {
    const sortedByPrice = prod.productAttributes.sort(
      (a, b) => a.discountPrice - b.discountPrice
    );
    return sortedByPrice[sortedByPrice.length - 1].originPrice;
  }

  navigateToDetails() {
    this._router.navigateByUrl(`/products/${this.prod.id}`);
  }

  handleClickFavourite() {
    if (this.isExistWishlist) {
      this._wishlist.deleteItem(this.prod.id);
      this._msg.add({
        severity: 'success',
        summary: 'Removed',
        detail: 'Removed product from wishlist successfully',
      });
    } else {
      this._wishlist.addToWishlist(this.prod);
      this._msg.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Add product to wishlist successfully',
      });
    }
  }
}
