import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseClass } from 'src/app/@common/base/base.class';
import {
  ECheckouStep,
  TCheckoutStep,
} from 'src/app/@common/types/checkout.type';
import { Product } from 'src/app/@common/types/product.type';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent extends BaseClass {
  eCheckoutStep = ECheckouStep;
  currentSteps: TCheckoutStep = ECheckouStep.INFORMATION;

  formInformation: FormGroup = this._fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  cartItems: Product[] = [];
  finishOrderInformation: any = {
    customerInformation: {},
    customerAddress: {},
    orderItems: [],
  };
  isFinish = false;

  constructor(private _fb: FormBuilder) {
    super();
  }

  override ngOnInit() {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
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

  public handleSubmitOrder() {
    localStorage.removeItem('cartItems');
    this.isFinish = true;
    this.finishOrderInformation = {
      ...this.finishOrderInformation,
      orderItems: this.cartItems,
    };
  }
}
