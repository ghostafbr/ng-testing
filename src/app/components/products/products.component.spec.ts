import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {defer, of} from 'rxjs';

import {ProductsComponent} from './products.component';
import {ProductComponent} from '../product/product.component';
import {ProductsService} from "../../services/products.service";
import {generateManyProducts} from '../../models/product.mock';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: ProductsService;
  let productServiceSpy: any = null;

  beforeEach(() => {
    productServiceSpy = {
      getAll: jest.fn() // Crear un espía para el método 'getAll'
    };
    TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [
        {provide: ProductsService, useValue: productServiceSpy}
      ]
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
    const productsMock = generateManyProducts(3);
    productServiceSpy.getAll.mockReturnValue(of(productsMock)); // Usar mockReturnValue en el espía
    fixture.detectChanges(); // ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productServiceSpy.getAll).toHaveBeenCalled();
  });

  describe('test for getAllProducts', () => {
    it('should return a list of products', () => {
      // Arrange
      const productsMock = generateManyProducts(10);
      productServiceSpy.getAll.mockReturnValue(of(productsMock)); // Usar mockReturnValue en el espía
      const countPrev = component.products.length;
      // Act
      component.getAllProducts();
      fixture.detectChanges(); // ngOnInit
      // Assert
      expect(component.products.length).toEqual(productsMock.length + countPrev);
    });

    it('should change the status from "loading" to "success"', fakeAsync(() => {
      // Arrange
      const productsMock = generateManyProducts(10);
      productServiceSpy.getAll.mockReturnValue(defer(() => Promise.resolve(productsMock))); // Usar mockReturnValue en el espía
      // Act
      component.getAllProducts();
      fixture.detectChanges(); // ngOnInit
      expect(component.status).toEqual('loading');
      tick(1000); // esperar 1 segundo, execute all pending asynchronous calls
      fixture.detectChanges();
      // Assert
      expect(component.status).toEqual('success');
    }));

    it('should change the status from "loading" to "error"', fakeAsync(() => {
      // Arrange
      const productsMock = generateManyProducts(10);
      productServiceSpy.getAll.mockReturnValue(defer(() => Promise.reject('error'))); // Usar mockReturnValue en el espía
      // Act
      component.getAllProducts();
      fixture.detectChanges(); // ngOnInit
      expect(component.status).toEqual('loading');
      tick(4000); // esperar 1 segundo, execute all pending asynchronous calls
      fixture.detectChanges();
      // Assert
      expect(component.status).toEqual('error');
    }));
  });

});

