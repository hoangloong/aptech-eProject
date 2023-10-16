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
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { SliderModule } from 'primeng/slider';
import { GalleriaModule } from 'primeng/galleria';

const primeModules = [
  StyleClassModule,
  RippleModule,
  AnimateModule,
  DividerModule,
  ButtonModule,
  SidebarModule,
  InputNumberModule,
  CheckboxModule,
  InputTextModule,
  InputTextareaModule,
  AccordionModule,
  BadgeModule,
  SliderModule,
  GalleriaModule,
];

@NgModule({
  imports: [...primeModules],
  exports: [...primeModules],
  providers: [],
})
export class PrimeModule {}
