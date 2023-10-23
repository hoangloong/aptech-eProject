import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseClass } from 'src/app/@common/base/base.class';
import { ProductsService } from 'src/app/@common/services/products.service';
import { Product, ProductAttribute } from 'src/app/@common/types/product.type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent extends BaseClass implements OnInit {
  product!: Product;
  selectedImg: number = 0;
  productAttributes: ProductAttribute[] = [];
  weightDropdownOptions: { value: number; label: string }[] = [];
  selectedAttribute = 0;
  quantity = 0;
  rating = 0;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _products: ProductsService
  ) {
    super();
  }

  get currentImg() {
    return this.product.productImages.find((img) => img.id === this.selectedImg)
      ?.imgUrl;
  }

  get currentAttribute() {
    return this.product.productAttributes.find(
      (attr) => attr.id === this.selectedAttribute
    );
  }
  override ngOnInit(): void {
    this._activatedRoute.params.subscribe({
      next: ({ id }) => {
        this._products
          .getProductById(id)
          .pipe(this.unsubsribeOnDestroy)
          .subscribe({
            next: (res: Product) => {
              this.product = res;
              this.productAttributes = res.productAttributes;
              this.selectedAttribute = res.productAttributes[0].id;
              this.rating =
                res.reviews
                  .map((item) => item.rate)
                  .reduce((accumulator, currentValue) => {
                    return accumulator + currentValue;
                  }, 0) / res.reviews.length;
              this.weightDropdownOptions = res.productAttributes.map(
                (attr) => ({
                  value: attr.id,
                  label: `${attr.weight} ${attr.weightUnit}`,
                })
              );
              this.selectedImg = res.productImages[0].id;
            },
          });
      },
    });
  }

  handleAddToCartClick() {
    const productSelected: Product = {
      ...this.product,
      quantity: this.quantity,
      productAttributes: this.currentAttribute ? [this.currentAttribute] : [],
    };
    const cartItems = JSON.parse(this._coookie.get('cartItems') || '[]');
    if (cartItems.some((prod: Product) => prod.id === productSelected.id)) {
      const newCartItems = cartItems.map((item: Product) =>
        item.id === productSelected.id
          ? { ...item, quantity: item.quantity + this.quantity }
          : item
      );

      this._coookie.set('cartItems', JSON.stringify(newCartItems));
    } else {
      this._coookie.set(
        'cartItems',
        JSON.stringify([...cartItems, productSelected])
      );
    }
  }
}
