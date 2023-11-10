import { Component, Host, HostListener, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseClass } from 'src/app/@common/base/base.class';
import { Category } from 'src/app/@common/types/category.type';
import { Product } from 'src/app/@common/types/product.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseClass implements OnInit {
  cartSidebar = false;
  categories: Category[] = [];
  showSearch = false;
  searchCtrl = new FormControl('', [Validators.required]);
  cartItems: Product[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    super();
  }

  override ngOnInit(): void {
    this.cartItems = JSON.parse(this._coookie.get('cartItems') || '[]');
    this._activatedRoute.data.subscribe(({ categories }) => {
      this.categories = categories;
    });
  }

  handleClickCategory(category: Category) {
    if (category.parentId) {
      this._router.navigateByUrl(
        `/products?sub_categories=${category.id}&paging=0&page_size=9`
      );
    } else {
      this._router.navigateByUrl(
        `/products?categories=${category.id}&paging=0&page_size=9`
      );
    }
  }

  handleSearchProduct(e: KeyboardEvent) {
    if (e.keyCode === 13 && this.searchCtrl.valid) {
      this._router.navigateByUrl(
        `/products?product_name=${this.searchCtrl.value}&paging=0&page_size=9`
      );
      this.showSearch = !this.showSearch;
    }
    if (e.keyCode === 27) {
      this.showSearch = !this.showSearch;
    }
  }
}
