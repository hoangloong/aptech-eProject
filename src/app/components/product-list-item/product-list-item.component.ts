import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BaseClass } from 'src/app/@common/base/base.class';
import { Product } from 'src/app/@common/types/product.type';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss'],
  providers: [MessageService],
})
export class ProductListItemComponent extends BaseClass implements OnInit {
  @Input({ alias: 'product', required: true }) product!: Product;
  attributes: { value: number; label: string }[] = [];
  selectedAttribute = 0;

  get currentAttribute() {
    return this.product.productAttributes.find(
      (attr) => attr.id === this.selectedAttribute
    );
  }

  constructor(private _msg: MessageService) {
    super();
  }

  override ngOnInit(): void {
    this.attributes = this.product.productAttributes.map((attr) => ({
      label: `${attr.weight} ${attr.weightUnit}`,
      value: attr.id,
    }));

    this.selectedAttribute = this.attributes[0].value;
  }

  handleAddToCartClick() {
    const productSelected: Product = {
      ...this.product,
      quantity: 1,
      productAttributes: this.currentAttribute ? [this.currentAttribute] : [],
    };
    const cartItems = JSON.parse(this._coookie.get('cartItems') || '[]');
    if (
      cartItems.some(
        (prod: Product) =>
          prod.id === productSelected.id &&
          prod.productAttributes[0].id ===
            productSelected.productAttributes[0].id
      )
    ) {
      const newCartItems = cartItems.map((item: Product) =>
        item.id === productSelected.id &&
        item.productAttributes[0].id === productSelected.productAttributes[0].id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      this._coookie.set('cartItems', JSON.stringify(newCartItems));
    } else {
      this._coookie.set(
        'cartItems',
        JSON.stringify([...cartItems, productSelected])
      );
    }

    this._msg.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Add product to card successfully',
    });
  }
}
