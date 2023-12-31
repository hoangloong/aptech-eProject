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
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { WishlistComponent } from './wishlist/wishlist.component';

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
    ContactUsComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    WishlistComponent,
  ],
  imports: [
    CommonModule,
    PrimeModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  exports: [HomeComponent],
})
export class PagesModule {}
