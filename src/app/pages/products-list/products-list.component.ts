import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/@common/services/products.service';
import { Category } from 'src/app/@common/types/category.type';
import { Product } from 'src/app/@common/types/product.type';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  categories: Category[] = [];
  selectedCategories: string[] = [];
  selectedSubCategories: string[] = [];
  products: Product[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _products: ProductsService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.parent?.data.subscribe(({ categories }) => {
      this.categories = categories;
    });

    this._activatedRoute.queryParams.subscribe((res) => {
      if (res['categories']) {
        this.selectedCategories = res['categories'].split(',');
      }
      if (res['sub_categories']) {
        this.selectedSubCategories = res['sub_categories'].split(',');
      }
      const queryParams = [
        ...this.selectedCategories.map((id) => +id),
        ...this.selectedSubCategories.map((id) => +id),
      ];
      this.getProducts(queryParams);
    });
  }

  getProducts(categoryIds: number[]) {
    this._products.getProducts(categoryIds).subscribe({
      next: (res) => {
        this.products = res;
      },
    });
  }

  handleChangeSelectedCategories() {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        categories: this.selectedCategories.toString(),
        sub_categories: this.selectedSubCategories.toString(),
      },
      queryParamsHandling: 'merge',
    });
  }
}
