import {Component, OnInit} from '@angular/core';
import {Product} from "../../../models/product.model";
import {ProductsService} from "../../../services/products.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product | null = null;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';
  typeCustomer: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params: { get: (arg0: string) => any; }) => {
        const productId = params.get('id');
        if (productId) {
          this.getProductDetail(productId);
        } else {
          this.goToBack();
        }
      });

    this.route.queryParamMap.subscribe(params => {
      this.typeCustomer = params.get('type');
    })
  }

  private getProductDetail(productId: string) {
    this.status = 'loading';
    this.productsService.getOne(productId)
      .subscribe({
        next: (product: Product) => {
          this.product = product;
          this.status = 'success';
        },
        error: () => {
          this.goToBack();
        }
      })
  }

  goToBack() {
    this.location.back();
  }


}
