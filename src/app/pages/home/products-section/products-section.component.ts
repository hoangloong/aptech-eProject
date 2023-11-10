import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseClass } from 'src/app/@common/base/base.class';
import {
  ProductQueryParams,
  ProductsService,
} from 'src/app/@common/services/products.service';
import { Product } from 'src/app/@common/types/product.type';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.scss'],
})
export class ProductsSectionComponent extends BaseClass implements OnInit {
  types: ('NEW' | 'SALE' | 'POPULAR')[] = ['NEW', 'SALE', 'POPULAR'];
  selectedType = 'NEW';
  products: Product[] = [];

  constructor(private _products: ProductsService, private _router: Router) {
    super();
  }

  override ngOnInit(): void {
    this.getProductsByType('NEW');
  }

  handleChangeType(type: 'NEW' | 'SALE' | 'POPULAR') {
    this.selectedType = type;
    this.getProductsByType(type);
  }

  getProductsByType(type: 'NEW' | 'SALE' | 'POPULAR') {
    let query: ProductQueryParams = {
      paging: 0,
      page_size: 4,
    };

    if (type === 'NEW') {
      query = {
        ...query,
        created_date: 'desc',
      };
    }

    this._products.getProducts(query).subscribe({
      next: (res) => {
        this.products = res;
      },
    });
  }

  onClickViewAll() {
    const query: ProductQueryParams = {
      paging: 0,
      page_size: 9,
    };
    this._router.navigate(['products'], { queryParams: { ...query } });
  }
}
