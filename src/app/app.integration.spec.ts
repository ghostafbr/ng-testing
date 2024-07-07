import {Component, DebugElement, NO_ERRORS_SCHEMA} from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import {Router, RouterLinkWithHref} from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import {clickElement, clickEvent, queryAllByDirective, query, getText} from "../testing";
import {routes} from "./app-routing.module";
import {AppModule} from "./app.module";
import {ProductsService} from "./services/products.service";
import {generateManyProducts} from "./models/product.mock";
import {Product} from "./models/product.model";
import {of} from "rxjs";
import {AuthService} from "./services/auth.service";
import {User} from "./models/user.model";
import {generateOneUser} from "./models/user.mock";



describe('App Integration test', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;
  let productService: jest.Mocked<ProductsService>;
  let authService: jest.Mocked<AuthService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        {provide: ProductsService, useValue: {getAll: jest.fn()}},
        {provide: AuthService, useValue: {getUser: jest.fn()}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // providers
    router = TestBed.inject(Router);
    productService = TestBed.inject(ProductsService) as jest.Mocked<ProductsService>;
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;

    router.initialNavigation();

    tick(); // wait while nav...
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should there are 7 routerLinks', () => {
    const links: DebugElement[] = queryAllByDirective(fixture, RouterLinkWithHref);
    expect(links.length).toEqual(7);
  });

  it('should render OthersComponent when clicked with session', fakeAsync(() => {
    const productsMock: Product[] = generateManyProducts(10);
    productService.getAll.mockReturnValueOnce(of(productsMock));

    const userMock: User = generateOneUser();
    authService.getUser.mockReturnValueOnce(of(userMock));

    clickElement(fixture, 'others-link', true);

    tick(); // wait while nav...
    fixture.detectChanges(); // ngOnInit - OthersComponent
    tick();
    fixture.detectChanges();

    expect(router.url).toEqual('/others');
    const element: DebugElement = query(fixture, 'app-others');
    expect(element).not.toBeNull();
    const text: string | null = getText(fixture, 'products-length');
    expect(text).toContain('Total ' + productsMock.length);
  }))

  it('should render OthersComponent when clicked without session', fakeAsync(() => {
    authService.getUser.mockReturnValueOnce(of(null));
    clickElement(fixture, 'others-link', true);

    tick(); // wait while nav...
    fixture.detectChanges(); // ngOnInit - OthersComponent
    tick();
    fixture.detectChanges();

    expect(router.url).toEqual('/');

  }))

});
