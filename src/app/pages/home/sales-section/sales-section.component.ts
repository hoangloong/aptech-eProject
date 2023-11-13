import { Component, OnInit } from '@angular/core';
import { BaseClass } from 'src/app/@common/base/base.class';
import { ProductsService } from 'src/app/@common/services/products.service';
import { Product } from 'src/app/@common/types/product.type';
import * as moment from 'moment';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-sales-section',
  templateUrl: './sales-section.component.html',
  styleUrls: ['./sales-section.component.scss'],
})
export class SalesSectionComponent extends BaseClass implements OnInit {
  products: Product[] = [];
  timeRemains: { [key: string]: number } = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  constructor(private _products: ProductsService) {
    super();

    setInterval(() => {
      const endOfWeek = moment()
        .endOf('week')
        .add(1, 'day')
        .endOf('day')
        .toISOString();
      this.timeRemains = this.getTimeBetweenDates(
        new Date(),
        new Date(endOfWeek)
      );
    }, 1000);
  }

  override ngOnInit(): void {
    this._products
      .getDealOfWeek()
      .pipe(this.unsubsribeOnDestroy)
      .subscribe({
        next: (res) => {
          this.products = res.data;
        },
      });
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

  getTimeBetweenDates = (startDate: Date, endDate: Date) => {
    const seconds = Math.floor(
      (endDate.getTime() - startDate.getTime()) / 1000
    );
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return {
      seconds: seconds - minutes * 60,
      minutes: minutes - hours * 60,
      hours: hours - days * 24,
      days,
    };
  };
}
