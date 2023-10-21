import {AuthService} from "./auth.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TokenService} from "./token.service";
import {TestBed} from "@angular/core/testing";
import {Auth} from "../models/auth.model";
import {environment} from "../../environments/environment";

describe('AuthService', () => {

  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        TokenService,
      ]
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('#login', () => {

    it('should return a token', (doneFn) => {
      // Arrange
      const mockData: Auth = {
        access_token: '123123',
      };
      const email = 'test@test.com';
      const password = '123123';
      // Act
      authService.login(email, password).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // Http Config
      const req = httpTestingController.expectOne(`${environment.API_URL}/api/v1/auth/login`);

      req.flush(mockData);
    });

    it('should call saveToken() ', (doneFn) => {
      // Arrange
      const mockData: Auth = {
        access_token: '123123',
      };
      const email = 'test@test.com';
      const password = '123123';
      jest.spyOn(tokenService, 'saveToken').mockReturnValue(undefined);
      // Act
      authService.login(email, password).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledWith(mockData.access_token);
        doneFn();
      });

      // Http Config
      const req = httpTestingController.expectOne(`${environment.API_URL}/api/v1/auth/login`);

      req.flush(mockData);
    });

  });

});
