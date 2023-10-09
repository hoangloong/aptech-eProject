import { NgModule } from '@angular/core';

// primeng modules
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';
import { AnimateModule } from 'primeng/animate';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';

const primeModules = [
  StyleClassModule,
  RippleModule,
  AnimateModule,
  DividerModule,
  ButtonModule,
  SidebarModule,
  InputNumberModule,
  CheckboxModule,
];

@NgModule({
  imports: [...primeModules],
  exports: [...primeModules],
  providers: [],
})
export class PrimeModule {}
