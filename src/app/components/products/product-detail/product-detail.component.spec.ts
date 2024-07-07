import {ActivatedRouteStub} from "../../../../testing/activated-route-stub";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { ProductDetailComponent } from './product-detail.component';
import {ProductsService} from "../../../services/products.service";
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {generateOneProduct} from "../../../models/product.mock";
import {getText, mockObservable} from "../../../../testing";
import {Location} from "@angular/common";
import {delay, of} from "rxjs";


describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productsService: ProductsService;
  let location: Location;
  let route: ActivatedRouteStub;
  let router: Router;
  let mockProductsService: Partial<ProductsService> = {
    getOne: jest.fn(),
  };

  beforeEach(async () => {
    const routeStub: ActivatedRouteStub = new ActivatedRouteStub();
    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      providers: [
        UserService,
        { provide:  ActivatedRoute, useValue: routeStub },
        { provide:  ProductsService, useValue: mockProductsService },
        { provide: Location, useValue: {back: jest.fn()} },
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents();
    // fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as any as ActivatedRouteStub;
    productsService = TestBed.inject(ProductsService);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    const productId: string = '1';
    route.setParamMap({ id: productId });

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    }

    productsService.getOne = jest.fn().mockReturnValue(mockObservable(productMock));

    fixture.detectChanges(); //ngOnInit
    expect(component).toBeTruthy();
  });

  it('should show the product in the view', () => {
    const productId: string = '2';
    route.setParamMap({ id: productId });

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    }

    productsService.getOne = jest.fn().mockReturnValue(mockObservable(productMock));

    fixture.detectChanges(); //ngOnInit
    const titleText: string | null = getText(fixture, 'title');
    const expectedPriceText: string = `$${productMock.price.toFixed(2)}`;const priceText: string | null = getText(fixture, 'price');
    expect(titleText).toContain(productMock.title);
    expect(priceText).toContain(expectedPriceText);
    expect(productsService.getOne).toHaveBeenCalledWith(productId);
  });

  it('should go to back without id params', () => {
    route.setParamMap({});
    location.back = jest.fn();
    fixture.detectChanges(); // ngOnInit
    expect(location.back).toHaveBeenCalled();
  });

  it('should change the status "loading" => "success"', fakeAsync(() => {
  // Arrange
  const productId = '2';
  route.setParamMap({ id: productId });

  const productMock = {
    ...generateOneProduct(),
    id: productId,
  }
  jest.spyOn(productsService, 'getOne').mockImplementation(() => of(productMock).pipe(delay(1)));

  // Act
  fixture.detectChanges(); // ngOnInit
  expect(component.status).toEqual('loading');

  // Assert
  tick(1000);
  fixture.detectChanges();
  expect(component.status).toEqual('success');
}));

  it('should typeCustomer be "customer"', () => {
    // Arrange
    const productId: string = '2';
    route.setParamMap({ id: productId });
    route.setQueryParamMap({ type: 'customer' });

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    }

    productsService.getOne = jest.fn().mockReturnValue(mockObservable(productMock));
    // Act
    fixture.detectChanges(); //ngOnInit
    expect(component.typeCustomer).toEqual('customer');
  });

});
