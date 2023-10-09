import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PrimeModule } from '../@shared/prime.module';
import { FooterComponent } from './footer/footer.component';
import { CartSidebarComponent } from './cart-sidebar/cart-sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, CartSidebarComponent],
  imports: [CommonModule, RouterModule, PrimeModule],
  exports: [HeaderComponent, FooterComponent, CartSidebarComponent],
})
export class ComponentsModule {}
