import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categories }) => {
      this.mainCategory = categories.find((item: Category) => item.id === 2)!;
      this.categories = categories.filter((item: Category) => item.id !== 2)!;
    });
  }
}
