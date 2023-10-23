import {Component, inject, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';
  private productsService = inject(ProductsService);

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

}
