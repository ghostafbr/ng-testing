import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { queryAllByDirective, RouterLinkDirectiveStub } from '../testing';
import {Component, DebugElement, NO_ERRORS_SCHEMA} from "@angular/core";

@Component({
  selector: 'app-banner'
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class BannerComponentStub {}

@Component({
  selector: 'app-footer'
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class FooterComponentStub {}

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub,
        BannerComponentStub,
        FooterComponentStub
      ],
      // schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ng-testing'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ng-testing');
  });

  it('should there are 7 routerLinks', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    expect(links.length).toEqual(7);
  });

  it('should there are 7 routerLinks with match routes', () => {
    const links: DebugElement[] = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    const routerLinks: RouterLinkDirectiveStub[] = links.map(link => link.injector.get(RouterLinkDirectiveStub))
    expect(links.length).toEqual(7);
    expect(routerLinks[0].linkParams).toEqual('/');
    expect(routerLinks[1].linkParams).toEqual('/auth/register');
  });
});
