import { Component, Input } from '@angular/core';
import { Product } from 'src/app/@common/types/product.type';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
})
export class OrderSuccessComponent {
  @Input() orderedItems: Product[] = [];

  public getTotalAmount() {
    if (this.orderedItems.length) {
      const amount = this.orderedItems
        .map((item) => item.productAttributes[0].discountPrice * item.quantity)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);

      return amount;
    } else {
      return 0;
    }
  }
}
