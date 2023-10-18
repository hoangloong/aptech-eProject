import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  constructor(private _activatedRoute: ActivatedRoute) {
    _activatedRoute.queryParams.subscribe((res) => {
      console.log(res);
    });
  }
}
