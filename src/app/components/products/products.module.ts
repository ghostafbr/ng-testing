import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductComponent} from "../product/product.component";
import {ProductsComponent} from "./products.component";


@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductsModule {
}
