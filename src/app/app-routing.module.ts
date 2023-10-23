import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

import { CategoriesResolver } from './@common/resolvers/categories.resolver';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LayoutsComponent } from './@common/layouts/layouts.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    resolve: { categories: CategoriesResolver },
    children: [
      { path: '', component: HomeComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'products', component: ProductsListComponent },
      { path: 'products/:id', component: ProductDetailsComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
