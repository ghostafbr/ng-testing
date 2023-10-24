import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ProductsComponent} from './products.component';
import {ProductsService} from '../../services/products.service';
import {ValueService} from '../../services/value.service';
import {generateManyProducts} from '../../models/product.mock';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ProductComponent} from "../product/product.component";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {
  asyncData,
  asyncError,
  mockObservable, queryByClass,
  queryByTestId,
} from "../../../testing";

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: ProductsService;
  let valueService: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [ProductsService, ValueService],
      imports: [HttpClientTestingModule]
    });

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
    valueService = TestBed.inject(ValueService);

    const productsMock = generateManyProducts(3);
    jest.spyOn(productService, 'getAll').mockReturnValue(mockObservable(productsMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });

  describe('test for getAllProducts', () => {
    it('should return a list of products', () => {
      // Arrange
      const productsMock = generateManyProducts(10);
      jest.spyOn(productService, 'getAll').mockReturnValue(mockObservable(productsMock));
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
      jest.spyOn(productService, 'getAll').mockReturnValue(asyncData(productsMock));
      // Act
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      tick(1000); // Wait 1 second, execute all pending asynchronous calls
      fixture.detectChanges();
      // Assert
      expect(component.status).toEqual('success');
    }));

    it('should change the status from "loading" to "error"', fakeAsync(() => {
      // Arrange
      jest.spyOn(productService, 'getAll').mockReturnValue(asyncError('error'));
      // Act
      component.getAllProducts();
      fixture.detectChanges(); // ngOnInit
      expect(component.status).toEqual('loading');
      tick(4000); // Wait 4 seconds, execute all pending asynchronous calls
      fixture.detectChanges();
      // Assert
      expect(component.status).toEqual('error');
    }));

    it('should getAll products when click on button', () => {
      // Arrange
      const productsMock = generateManyProducts(10);
      jest.spyOn(productService, 'getAll').mockReturnValue(mockObservable(productsMock));
      const countPrev = component.products.length;
      const buttonDebug: DebugElement = queryByTestId(fixture, 'btn-load-more');
      // Act
      buttonDebug.triggerEventHandler('click', null);
      fixture.detectChanges();
      // Assert
      expect(component.products.length).toEqual(productsMock.length + countPrev);
    });

  });

  describe('#callPromise', () => {
    it('should call the promise', async () => {
      // Arrange
      const promiseValue = 'Promise Value';
      jest.spyOn(valueService, 'getPromiseValue').mockReturnValue(Promise.resolve(promiseValue));
      // Act
      await component.callPromise();
      fixture.detectChanges();
      // Assert
      expect(component.response).toEqual(promiseValue);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    });

    it('should show "my mock string" in <p> when btn is clicked', async () => {
      // Arrange
      const mockMsg = 'my mock string';
      jest.spyOn(valueService, 'getPromiseValue').mockResolvedValue(mockMsg);
      const buttonDebug = queryByTestId(fixture, 'btn-promise')

      // Act
      buttonDebug.triggerEventHandler('click', null);
      await fixture.whenStable(); // Esperar hasta que todas las tareas asincrónicas se completen
      fixture.detectChanges();
      const responseDebug = queryByClass(fixture,'p.resp');

      // Assert
      expect(valueService.getPromiseValue).toHaveBeenCalled();
      expect(component.response).toEqual(mockMsg);
      expect(responseDebug.nativeElement.textContent).toEqual(mockMsg);
    });
  });

});

