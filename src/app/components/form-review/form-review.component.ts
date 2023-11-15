import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductsService } from 'src/app/@common/services/products.service';
import { ProductReview } from 'src/app/@common/types/product.type';

@Component({
  selector: 'app-form-review',
  templateUrl: './form-review.component.html',
  styleUrls: ['./form-review.component.scss'],
})
export class FormReviewComponent implements OnInit {
  @Output() postReviewSuccess = new EventEmitter<boolean>(false);
  formReview = this._fb.group({
    customerName: ['', [Validators.required]],
    rate: [5, [Validators.required]],
    title: ['', [Validators.required]],
    comment: ['', [Validators.required]],
  });
  prodId = 0;

  constructor(
    private _fb: FormBuilder,
    private _products: ProductsService,
    private _route: ActivatedRoute,
    private _msg: MessageService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(({ id }) => {
      this.prodId = +id;
    });
  }

  handleSubmit() {
    if (this.formReview.valid) {
      const body = {
        productId: this.prodId,
        ...this.formReview.value,
      };
      this._products.postReview(body as Partial<ProductReview>).subscribe({
        next: (res) => {
          this._msg.add({
            severity: 'success',
            summary: 'Susscess',
            detail: 'Post reviews successfully',
          });
          this.postReviewSuccess.emit(true);
          this.formReview.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.formReview.markAllAsTouched();
    }
  }
}
