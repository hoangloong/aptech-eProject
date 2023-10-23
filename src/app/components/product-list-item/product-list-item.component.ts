import { Component, Input, OnInit } from '@angular/core';
import { BaseClass } from 'src/app/@common/base/base.class';
import { Product } from 'src/app/@common/types/product.type';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss'],
})
export class ProductListItemComponent extends BaseClass implements OnInit {
  @Input({ alias: 'product', required: true }) product!: Product;
  attributes: { value: number; label: string }[] = [];
  selectedAttribute = 0;

  override ngOnInit(): void {
    this.attributes = this.product.productAttributes.map((attr) => ({
      label: `${attr.weight} ${attr.weightUnit}`,
      value: attr.id,
    }));

    this.selectedAttribute = this.attributes[0].value;

    console.log(this.getSelectedAttribute());
  }

  getSelectedAttribute() {
    return this.product.productAttributes.find(
      (attr) => attr.id === this.selectedAttribute
    );
  }
}
