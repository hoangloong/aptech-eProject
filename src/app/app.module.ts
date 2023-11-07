import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CookieService } from 'ngx-cookie-service';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { LayoutsComponent } from './@common/layouts/layouts.component';
import { ErrorHandlingInterceptor } from './@common/interceptors/error-handling';
import { PrimeModule } from './@shared/prime.module';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [AppComponent, LayoutsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    PagesModule,
    PrimeModule,
  ],
  providers: [
    MessageService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
