import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PrimeModule } from '../@shared/prime.module';
import { FooterComponent } from './footer/footer.component';
import { CartSidebarComponent } from './cart-sidebar/cart-sidebar.component';
import { RouterModule } from '@angular/router';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { FormsModule } from '@angular/forms';
import { FormReviewsComponent } from './form-reviews/form-reviews.component';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CartSidebarComponent,
    ProductListItemComponent,
    FormReviewsComponent,
    ReviewsComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterModule,
    PrimeModule,
    FormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CartSidebarComponent,
    ProductListItemComponent,
    FormReviewsComponent,
    ReviewsComponent,
  ],
})
export class ComponentsModule {}
