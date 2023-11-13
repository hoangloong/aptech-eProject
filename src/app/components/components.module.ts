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
import { ProductSectionItemComponent } from './product-section-item/product-section-item.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CartSidebarComponent,
    ProductListItemComponent,
    ReviewsComponent,
    FormReviewComponent,
    OrderSuccessComponent,
    ProductSectionItemComponent,
    SplashScreenComponent,
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
    ProductSectionItemComponent,
    SplashScreenComponent,
  ],
})
export class ComponentsModule {}
