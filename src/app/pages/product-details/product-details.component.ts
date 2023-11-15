import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BaseClass } from 'src/app/@common/base/base.class';
import { ProductsService } from 'src/app/@common/services/products.service';
import { Category } from 'src/app/@common/types/category.type';
import { Product, ProductAttribute } from 'src/app/@common/types/product.type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [MessageService],
})
export class ProductDetailsComponent extends BaseClass implements OnInit {
  product!: Product;
  selectedImg: number = 0;
  productAttributes: ProductAttribute[] = [];
  weightDropdownOptions: { value: number; label: string }[] = [];
  selectedAttribute = 0;
  quantity = 0;
  rating = 0;
  categories: Category[] = [];
  similarProducts: Product[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _products: ProductsService,
    private _msg: MessageService
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
    this._activatedRoute.parent?.data.subscribe(({ categories }) => {
      this.categories = categories;
    });

    this._activatedRoute.params.subscribe({
      next: ({ id }) => {
        this.getProductDetails(+id);
      },
    });
  }

  getProductDetails(id: number) {
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
          this.weightDropdownOptions = res.productAttributes.map((attr) => ({
            value: attr.id,
            label: `${attr.weight} ${attr.weightUnit}`,
          }));
          this.selectedImg = res.productImages[0].id;
          this.similarProducts = this.getSimilarProducts(res.categoryId) || [];
        },
      });
  }

  getSimilarProducts(id: number) {
    const flatCategories: Category[] = this.categories.reduce(
      (a: Category[], v: Category) => {
        return [...a, ...v.categories];
      },
      [...this.categories]
    );
    const currentCategory = flatCategories.find((item) => item.id === id);
    const similarPoduct = flatCategories
      .find((item) => item.id === currentCategory?.parentId ?? item.id === id)
      ?.categories.flatMap((item) => item.products)
      .filter((item) => item.id !== this.product.id)
      .slice(0, 10);

    return similarPoduct;
  }

  handleAddToCartClick() {
    const productSelected: Product = {
      ...this.product,
      quantity: this.quantity,
      productAttributes: this.currentAttribute ? [this.currentAttribute] : [],
    };
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
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
          ? { ...item, quantity: item.quantity + this.quantity }
          : item
      );

      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    } else {
      localStorage.setItem(
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
