import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PrimeModule } from '../@shared/prime.module';
import { FooterComponent } from './footer/footer.component';
import { CartSidebarComponent } from './cart-sidebar/cart-sidebar.component';
import { RouterModule } from '@angular/router';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewsComponent } from './reviews/reviews.component';
import { FormReviewComponent } from './form-review/form-review.component';
import { OrderSuccessComponent } from './order-success/order-success.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CartSidebarComponent,
    ProductListItemComponent,
    ReviewsComponent,
    FormReviewComponent,
    OrderSuccessComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CartSidebarComponent,
    ProductListItemComponent,
    ReviewsComponent,
    FormReviewComponent,
    OrderSuccessComponent,
  ],
})
export class ComponentsModule {}
