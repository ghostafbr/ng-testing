import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { ProductsComponent } from './components/products/products.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import { PersonComponent } from './components/person/person.component';
import { PeopleComponent } from './components/people/people.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    PicoPreviewComponent,
    ProductsComponent,
    PersonComponent,
    PeopleComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
