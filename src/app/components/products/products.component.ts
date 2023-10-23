import {Component, inject, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/product.model";
import {ValueService} from "../../services/value.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  limit = 10;
  offset = 0;
  response = '';
  status: 'loading' | 'success' | 'error' | 'init' = 'init';
  private productsService = inject(ProductsService);
  private valueService = inject(ValueService);

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.status = 'loading';
    return this.productsService.getAll(this.limit, this.offset).subscribe({
      next: (products) => {
        this.products = [...this.products, ...products];
        this.offset = this.limit;
        this.status = 'success';
      },
      error: (error) => {
        setTimeout(() => {
          this.products = [];
          this.status = 'error';
        }, 3000);
      }
    });
  }

  async callPromise() {
    this.response = await this.valueService.getPromiseValue();
  }

}
