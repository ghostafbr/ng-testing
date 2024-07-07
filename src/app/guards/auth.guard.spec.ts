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
  let tokenService: jest.Mocked<TokenService>;
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;

  beforeEach((): void => {

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {provide: AuthService, useValue: {getUser: jest.fn()}},
        {provide: TokenService, useValue: {getToken: jest.fn()}},
        {provide: Router, useValue: {navigate: jest.fn()}},
      ],
    });
    guard = TestBed.inject(AuthGuard);
    tokenService = TestBed.inject(TokenService) as jest.Mocked<TokenService>;
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('should be create', (): void => {
    expect(guard).toBeTruthy();
  });

  it('should return true with session', (doneFn: jest.DoneCallback): void => {
    const activatedRoute: ActivatedRouteSnapshot = fakeActivatedRouteSnapshot({});
    const routerState: RouterStateSnapshot = fakeRouterStateSnapshot({});
    const userMock: User = generateOneUser();
    jest.spyOn(tokenService, 'getToken');

    jest.spyOn(authService as any, 'getUser').mockReturnValue(mockObservable(userMock));

    guard.canActivate(activatedRoute, routerState).subscribe((resp: any): void => {
      expect(resp).toBeTruthy();
      doneFn();
    });
  });

  it('should return false without session', (doneFn: jest.DoneCallback): void => {
    const activatedRoute: ActivatedRouteSnapshot = fakeActivatedRouteSnapshot({});
    const routerState: RouterStateSnapshot = fakeRouterStateSnapshot({});

    jest.spyOn(authService, 'getUser').mockReturnValue(mockObservable(null));
    jest.spyOn(router, 'navigate');

    guard.canActivate(activatedRoute, routerState)
      .subscribe(resp => {
        expect(resp).toBeFalsy();
        expect(router.navigate).toHaveBeenCalledWith(['/']);
        doneFn();
      });
  });

  it('should false with idProduct Params', (doneFn: jest.DoneCallback) => {
    const activatedRoute: ActivatedRouteSnapshot = fakeActivatedRouteSnapshot({});
    const routerState: RouterStateSnapshot = fakeRouterStateSnapshot({});

    authService.getUser.mockReturnValue(mockObservable(null));

    guard.canActivate(activatedRoute, routerState)
      .subscribe(rta => {
        expect(rta).toBeFalsy()
        expect(router.navigate).toHaveBeenCalledWith(['/']);
        doneFn();
      });
  });

});
