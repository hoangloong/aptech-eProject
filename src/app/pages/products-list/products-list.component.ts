import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import {
  ProductQueryParams,
  ProductsService,
} from 'src/app/@common/services/products.service';
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
  filter: any = [];
  total = 0;

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
      const categoryIds = [
        ...this.selectedCategories.map((id) => +id),
        ...this.selectedSubCategories.map((id) => +id),
      ];

      const params: ProductQueryParams = {
        product_name: res['product_name'] || '',
        categories: categoryIds.toString(),
        created_date: 'asc',
        paging: res['paging'] || 0,
        page_size: res['page_size'] || 9,
      };

      this.filter = [
        params.product_name
          ? { key: 'Product Name', value: params.product_name }
          : '',
        params.categories?.length
          ? params.categories.split(',').map((item) => ({
              key: 'Category',
              value: this.getCategoryName(+item),
            }))
          : '',
      ]
        .filter((item) => !!item)
        .flat();

      this.getProducts(params);
    });
  }

  getCategoryName(id: number) {
    return (
      this.categories.find((item) => item.id === id)?.name ||
      this.categories
        .flatMap((item) => item.categories)
        .find((item) => item.id === id)?.name ||
      ''
    );
  }

  getProducts(params: ProductQueryParams) {
    this._products.getProducts(params).subscribe({
      next: (res) => {
        this.products = res.data;
        this.total = res.total;
      },
    });
  }

  handleChangeSelectedCategories() {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        categories: this.selectedCategories.toString(),
        sub_categories: this.selectedSubCategories.toString(),
        paging: 0,
      },
      queryParamsHandling: 'merge',
    });
  }

  onRemoveFilter(item: { key: string; value: string }) {
    if (item.key === 'Category') {
      const removedCategory =
        this.categories.find((x) => item.value === x.name)?.id ||
        this.categories
          .flatMap((x) => x.categories)
          .find((x) => x.name === item.value)?.id ||
        '';
      this.selectedCategories = this.selectedCategories.filter(
        (x) => x !== removedCategory.toString()
      );
      this.selectedSubCategories = this.selectedSubCategories.filter(
        (x) => x !== removedCategory.toString()
      );
    }

    if (item.key === 'Product Name') {
      this.filter = this.filter.filter(
        (item: { key: string; value: string }) => item.key !== 'Product Name'
      );
    }

    const queryParams: { [key: string]: string } = {
      categories: this.selectedCategories.toString(),
      sub_categories: this.selectedSubCategories.toString(),
      product_name:
        (this.filter.find(
          (item: { key: string; value: string }) => item.key === 'Product Name'
        )?.value as string) || '',
    };

    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        ...queryParams,
        paging: 0,
      },
      queryParamsHandling: 'merge',
    });
  }

  onPageChange(e: PaginatorState) {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        paging: e.page,
      },
      queryParamsHandling: 'merge',
    });
  }
}
