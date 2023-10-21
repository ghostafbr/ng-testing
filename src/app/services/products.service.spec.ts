import {ProductsService} from "./products.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {CreateProductDTO, Product, UpdateProductDTO} from "../models/product.model";
import {environment} from "../../environments/environment";
import {generateManyProducts, generateOneProduct} from "../models/product.mock";

describe('ProductsService', () => {
  let productsService: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService, HttpClient],
    });
    productsService = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(productsService).toBeTruthy();
  });

  describe('#getAllSimple', () => {

    it('should return an Product List', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts(2);
      // Act
      productsService.getAllSimple().subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        expect(data).toEqual(mockData);
        doneFn();
      });

      // Http Config
      const req = httpTestingController.expectOne(`${environment.API_URL}/api/v1/products`);
      req.flush(mockData);

    });

  });

  describe('#getAll', () => {

    it('should return an Product List', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts(3);
      // Act
      productsService.getAll().subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        // expect(data).toEqual(mockData);
        doneFn();
      });

      // Http Config
      const req = httpTestingController.expectOne(`${environment.API_URL}/api/v1/products`);
      req.flush(mockData);

    });

    it('should return an Product List with taxes', (doneFn) => {
      // Arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 100 * .19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 200 * .19 = 38
        },
        {
          ...generateOneProduct(),
          price: 0, // 0 * .19 = 0
        },
        {
          ...generateOneProduct(),
          price: -100, // = 0
        }
      ];
      // Act
      productsService.getAll().subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        doneFn();
      });

      // Http Config
      const req = httpTestingController.expectOne(`${environment.API_URL}/api/v1/products`);
      req.flush(mockData);

    });

    it('should send query params with limit 10 and offset 3', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 3;
      // Act
      productsService.getAll(limit, offset).subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        // expect(data).toEqual(mockData);
        doneFn();
      });

      // Http Config
      const req = httpTestingController.expectOne(`${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(limit.toString());
      expect(params.get('offset')).toEqual(offset.toString());

    });

  });

  describe('#create', () => {

      it('should return a new Product', (doneFn) => {
        // Arrange
        const mockData: Product = generateOneProduct();
        const dto: CreateProductDTO = {
          title: 'New product',
          price: 100,
          images: ['http://image.com/1', 'http://image.com/2'],
          description: 'New description',
          categoryId: 12,
        };
        // Act
        productsService.create({...dto}).subscribe((data) => {
          // Assert
          expect(data).toEqual(mockData);
          doneFn();
        });

        // Http Config
        const req = httpTestingController.expectOne(`${environment.API_URL}/api/v1/products`);
        req.flush(mockData);
        expect(req.request.body).toEqual(dto);
        expect(req.request.method).toEqual('POST');

      });

  });

  describe('#update', () => {
    it('should return an updated Product', (doneFn) => {
      // Arrange
      const mockData: Product = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'new Product'
      };
      const productId = '1';
      // Act
      productsService.update(productId, {...dto}).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // Http Config
      const req = httpTestingController.expectOne(`${environment.API_URL}/api/v1/products/${productId}`);
      req.flush(mockData);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(dto);

    });
  });

  describe('#getByCategory', () => {

    it('should return an Product List', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts(3);
      const categoryId = '1';
      // Act
      productsService.getByCategory(categoryId).subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        // expect(data).toEqual(mockData);
        doneFn();
      });

      // Http Config
      const req = httpTestingController.expectOne(`${environment.API_URL}/api/v1/categories/${categoryId}/products`);
      req.flush(mockData);

    });

    it('should send query params with limit 10 and offset 3', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts(3);
      const categoryId = '1';
      const limit = 10;
      const offset = 3;
      // Act
      productsService.getByCategory(categoryId, limit, offset).subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        // expect(data).toEqual(mockData);
        doneFn();
      });

      // Http Config
      const req = httpTestingController.expectOne(`${environment.API_URL}/api/v1/categories/${categoryId}/products?limit=${limit}&offset=${offset}`);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(limit.toString());
      expect(params.get('offset')).toEqual(offset.toString());

    });
  });

  describe('#delete', () => {

    it('should delete a product', (doneFn) => {

      // Arrange
      const mockData = true;
      const productId = '1';
      // Act
      productsService.delete(productId).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // Http Config
      const req = httpTestingController.expectOne(`${environment.API_URL}/api/v1/products/${productId}`);
      req.flush(mockData);
      expect(req.request.method).toEqual('DELETE');

    });

  });

  /*describe('#fetchReadAndUpdate', () => {

      it('should return an Product List', (doneFn) => {
        // Arrange
        const mockData: Product = generateOneProduct();
        const dto = {
          title: 'new title'
        };
        // Act
        productsService.fetchReadAndUpdate(mockData.id, dto).subscribe(([data, updatedData]) => {
          // Assert
          expect(data).toEqual(mockData);
          expect(updatedData).toEqual({...mockData, ...dto});
          doneFn();
        });

        // Http Config
        const req = httpTestingController.expectOne(`${environment.API_URL}/api/v1/products/${mockData.id}`);
        req.flush(mockData);
        const req2 = httpTestingController.expectOne(`${environment.API_URL}/api/v1/products/${mockData.id}`);
        req2.flush({...mockData, ...dto});

      });

  });*/


});
