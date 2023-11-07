import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-review',
  templateUrl: './form-review.component.html',
  styleUrls: ['./form-review.component.scss'],
})
export class FormReviewComponent {
  formReview: FormGroup = this._fb.group({
    customerName: ['', [Validators.required]],
    rate: [5, [Validators.required]],
    title: ['', [Validators.required]],
    comment: ['', [Validators.required]],
  });

  constructor(private _fb: FormBuilder) {}

  handleSubmit() {
    if (this.formReview.valid) {
    } else {
      this.formReview.markAllAsTouched();
    }
  }
}
