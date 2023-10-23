import { Component, Input } from '@angular/core';
import { ProductReview } from 'src/app/@common/types/product.type';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent {
  @Input({ required: true }) review!: ProductReview;
}
