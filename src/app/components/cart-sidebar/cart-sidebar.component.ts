import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseClass } from 'src/app/@common/base/base.class';
import { Product } from 'src/app/@common/types/product.type';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss'],
})
export class CartSidebarComponent extends BaseClass implements OnInit {
  @Output('onHide') onHideSidebar = new EventEmitter<boolean>();
  cartItems: Product[] = [];
  constructor() {
    super();
  }

  override ngOnInit() {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  }

  public handleHideSidebar() {
    this.onHideSidebar.emit(true);
  }

  public getTotalAmount() {
    if (this.cartItems.length) {
      const amount = this.cartItems
        .map((item) => item.productAttributes[0].discountPrice * item.quantity)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);

      return amount;
    } else {
      return 0;
    }
  }

  public handleDeleteItem(prod: Product) {
    this.cartItems = this.cartItems.filter(
      (item) =>
        !(
          item.id === prod.id &&
          item.productAttributes[0].id === prod.productAttributes[0].id
        )
    );
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  public handleChangeQuantity(e: number = 0, prod: Product) {
    this.cartItems = this.cartItems.map((item) =>
      item.id !== prod.id &&
      item.productAttributes[0].id === prod.productAttributes[0].id
        ? { ...item, quantity: e }
        : item
    );
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
