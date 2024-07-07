import { TestBed } from "@angular/core/testing";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { TokenService } from "../services/token.service";
import { AuthGuard } from "./auth.guard";
import {generateOneUser} from "../models/user.mock";
import {fakeActivatedRouteSnapshot, fakeParamMap, fakeRouterStateSnapshot} from "../../testing/snapshot";
import {mockObservable} from "../../testing";
import {User} from "../models/user.model";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('Tests for AuthGuard', (): void => {
  let guard: AuthGuard;
  let tokenService: TokenService;
  let authService: AuthService;
  let router: Router;

  beforeEach((): void => {
    // const tokenServiceSpy: jest.SpyInstance = jest.spyOn(TokenService as any, 'getToken');
    // const authServiceSpy: jest.SpyInstance = jest.spyOn(AuthService as any, 'user$');
    // const routerSpy: jest.SpyInstance = jest.spyOn(Router as any, 'navigate');

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,

        /*{ provide: TokenService, useValue: jest.fn() },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },*/
      ],
      imports: [HttpClientTestingModule],
    });
    guard = TestBed.inject(AuthGuard);
    tokenService = TestBed.inject(TokenService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be create', (): void => {
    expect(guard).toBeTruthy();
  });

  it('should return true with session', (done): void => {
    const activatedRoute: ActivatedRouteSnapshot = fakeActivatedRouteSnapshot({
      /*
      * params: {
      *  idProduct: '1212'
      * }
      * */
      paramMap: fakeParamMap({
        idProduct: '1212'
      })
    });
    const routerState: RouterStateSnapshot = fakeRouterStateSnapshot({});
    const userMock: User = generateOneUser();
    jest.spyOn(tokenService, 'getToken');

    jest.spyOn(authService as any, 'getUser').mockReturnValue(mockObservable(userMock));

    guard.canActivate(activatedRoute, routerState).subscribe((resp: any): void => {
      expect(resp).toBeTruthy();
      done();
    });
  });

  it('should return false without session', (doneFn: jest.DoneCallback): void => {
    const activatedRoute: ActivatedRouteSnapshot = fakeActivatedRouteSnapshot({
      /*
      * params: {
      *  idProduct: '1212'
      * }
      * */
      paramMap: fakeParamMap({
        idProduct: '1212'
      })
    });
    const routerState: RouterStateSnapshot = fakeRouterStateSnapshot({});

    jest.spyOn(authService, 'getUser').mockReturnValue(mockObservable(null));
    jest.spyOn(router, 'navigate');

    guard.canActivate(activatedRoute, routerState)
      .subscribe(resp => {
        expect(resp).toBeFalsy();
        expect(router.navigate).toHaveBeenCalledWith(['/home']);
        doneFn();
      });
  });

});
