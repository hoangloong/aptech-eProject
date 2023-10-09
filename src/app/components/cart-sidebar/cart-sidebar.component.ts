import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseClass } from 'src/app/@common/base/base.class';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss'],
})
export class CartSidebarComponent extends BaseClass implements OnInit {
  @Output('onHide') onHideSidebar = new EventEmitter<boolean>();
  cartItems = [];
  constructor() {
    super();
  }

  override ngOnInit() {
    this.cartItems = JSON.parse(this._coookie.get('cartItems'));
    console.log(this.cartItems);
  }

  public handleHideSidebar() {
    this.onHideSidebar.emit(true);
  }
}
