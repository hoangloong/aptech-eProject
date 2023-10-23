import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/@common/services/categories.service';
import { Category } from 'src/app/@common/types/category.type';

@Component({
  selector: 'app-categories-section',
  templateUrl: './categories-section.component.html',
  styleUrls: ['./categories-section.component.scss'],
})
export class CategoriesSectionComponent implements OnInit {
  mainCategory?: Category;
  categories: Category[] = [];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(({ categories }) => {
      this.mainCategory = categories.find((item: Category) => item.id === 1)!;
      this.categories = categories.filter(
        (item: Category) => item.id !== 1 && item.id < 5
      )!;
    });
  }

  handleClickCategory(category?: Category) {
    if (category) {
      this._router.navigateByUrl(`/products?categories=${category.id}`);
    }
  }
}
