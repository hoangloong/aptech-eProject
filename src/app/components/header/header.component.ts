import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseClass } from 'src/app/@common/base/base.class';
import { Category } from 'src/app/@common/types/category.type';

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
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    super();
  }

  override ngOnInit(): void {
    this._activatedRoute.data.subscribe(({ categories }) => {
      this.categories = categories;
    });
  }

  handleClickCategory(category: Category) {
    if (category.parentId) {
      this._router.navigateByUrl(
        `/products?categories=${category.parentId}&sub_categories=${category.id}`
      );
    } else {
      this._router.navigateByUrl(`/products?categories=${category.id}`);
    }
  }

  handleSearchProduct(e: KeyboardEvent) {
    if (e.keyCode === 13 && this.searchCtrl.valid) {
      this._router.navigateByUrl(
        `/products?product_name=${this.searchCtrl.value}`
      );
    }
  }
}
