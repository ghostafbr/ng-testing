import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { ProductsComponent } from './components/products/products.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import { PersonComponent } from './components/person/person.component';
import { PeopleComponent } from './components/people/people.component';
import { ProductComponent } from './components/product/product.component';
import { OthersComponent } from './components/others/others.component';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    PicoPreviewComponent,
    ProductsComponent,
    PersonComponent,
    PeopleComponent,
    ProductComponent,
    OthersComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
