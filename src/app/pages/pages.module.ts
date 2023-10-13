import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CategoriesSectionComponent } from './home/categories-section/categories-section.component';
import { ProductsSectionComponent } from './home/products-section/products-section.component';
import { SalesSectionComponent } from './home/sales-section/sales-section.component';
import { PromoTestimonialsSectionComponent } from './home/promo-testimonials-section/promo-testimonials-section.component';
import { IncentiveSectionComponent } from './home/incentive-section/incentive-section.component';
import { PrimeModule } from '../@shared/prime.module';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    HomeComponent,
    CategoriesSectionComponent,
    ProductsSectionComponent,
    SalesSectionComponent,
    PromoTestimonialsSectionComponent,
    IncentiveSectionComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    AboutUsComponent,
  ],
  imports: [CommonModule, PrimeModule],
  exports: [HomeComponent],
})
export class PagesModule {}
