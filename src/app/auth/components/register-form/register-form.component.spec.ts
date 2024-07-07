import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {RegisterFormComponent} from './register-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UserService} from "../../../services/user.service";
import {
  asyncData,
  asyncError,
  clickElement,
  getText,
  mockObservable,
  queryByClass, queryByTestId,
  setCheckboxValue,
  setInputValue
} from "../../../../testing";
import {generateOneUser} from "../../../models/user.mock";
import {of} from "rxjs";
import {Router} from "@angular/router";

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userService: UserService;
  let userServiceSpyCreate: any;
  let userServiceSpyIsAvailableEmail: any;
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      providers: [
        UserService,
        { provide: Router, useValue: {navigateByUrl: jest.fn()} }
      ],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    });

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);

    userServiceSpyCreate = jest.spyOn(userService, 'create');
    userServiceSpyIsAvailableEmail = jest.spyOn(userService, 'isAvailableEmail');

    userServiceSpyIsAvailableEmail.mockReturnValue(of({isAvailable: true}));

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the email field be invalid', () => {
    component.emailField?.setValue('this is not an email');
    expect(component.emailField?.valid).toBeFalsy();

    component.emailField?.setValue('');
    expect(component.emailField?.invalid).toBeTruthy();
  });

  it('should the passwordField valid', () => {
    component.passwordField?.setValue('');
    expect(component.passwordField?.invalid).toBeTruthy();

    component.passwordField?.setValue('12345');
    expect(component.passwordField?.invalid).toBeTruthy();

    component.passwordField?.setValue('dfghdfghdfgh');
    expect(component.passwordField?.invalid).toBeTruthy();

    component.passwordField?.setValue('dfghdf4sghdfgh');
    expect(component.passwordField?.valid).toBeTruthy();
  });

  it('should the form be invalid', () => {
    component.form.patchValue({
      name: 'Andrés',
      email: 'ghostafbr@gmail.com',
      password: '123456',
      confirmPassword: '123456',
      checkTerms: false
    });
    expect(component.form.invalid).toBeTruthy();
  });

  it('should the email field be invalid from UI', () => {
    const inputDe = queryByClass(fixture, 'input#email');
    const inputEl: HTMLInputElement = inputDe.nativeElement;

    inputEl.value = "esto no es un correo";
    inputEl.dispatchEvent(new Event('input'));
    inputEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(component.emailField?.invalid).toBeTruthy();

    const textError = getText(fixture, 'emailField-email');
    expect(textError).toContain("It's not a email");
  });

  it('should the email field be invalid from UI with setInputValue', () => {
    setInputValue(fixture, 'input#email', "It's not a email");
    fixture.detectChanges();
    expect(component.emailField?.invalid).toBeTruthy();

    const textError = getText(fixture, 'emailField-email');
    expect(textError).toContain("It's not a email");
  });

  it('should send form successfully', () => {
    component.form.patchValue({
      name: 'Andrés',
      email: 'ghostafbr@gmail.com',
      password: '12121212',
      confirmPassword: '12121212',
      checkTerms: true
    });
    const mockUser = generateOneUser();
    userServiceSpyCreate.mockReturnValue(mockObservable(mockUser));
    // Act
    component.register(new Event('submit'));
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();
  });

  it('should send form successfully and change "loading" to "success"', fakeAsync(() => {
    component.form.patchValue({
      name: 'Andrés',
      email: 'ghostafbr@gmail.com',
      password: '12121212',
      confirmPassword: '12121212',
      checkTerms: true
    });
    const mockUser = generateOneUser();
    userServiceSpyCreate.mockReturnValue(asyncData(mockUser));
    // Act
    component.register(new Event('submit'));
    expect(component.status).toEqual('loading');
    tick();
    fixture.detectChanges();
    expect(component.status).toEqual('success');
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/login');
  }));

  it('should send form successfully demo UI', fakeAsync(() => {
    setInputValue(fixture, 'input#name', 'Andrés');
    setInputValue(fixture, 'input#email', 'test@test.com');
    setInputValue(fixture, 'input#password', '12121212');
    setInputValue(fixture, 'input#confirmPassword', '12121212');
    setCheckboxValue(fixture, 'input#terms', true);
    const mockUser = generateOneUser();
    userServiceSpyCreate.mockReturnValue(asyncData(mockUser));
    // Act
    // queryByClass(fixture, 'form').triggerEventHandler('ngSubmit', new Event('submit'));
    clickElement(fixture, 'btn-submit', true);
    fixture.detectChanges();
    expect(component.status).toEqual('loading');
    tick();
    fixture.detectChanges();
    expect(component.status).toEqual('success');
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();
  }));

  it('should send the form from the UI but with error in the service', fakeAsync(() => {
    setInputValue(fixture, 'input#name', 'Andrés');
    setInputValue(fixture, 'input#email', 'test@test.com');
    setInputValue(fixture, 'input#password', '12121212');
    setInputValue(fixture, 'input#confirmPassword', '12121212');
    setCheckboxValue(fixture, 'input#terms', true);
    const mockUser = generateOneUser();
    userServiceSpyCreate.mockReturnValue(asyncError(mockUser));
    // Act
    // queryByClass(fixture, 'form').triggerEventHandler('ngSubmit', new Event('submit'));
    clickElement(fixture, 'btn-submit', true);
    fixture.detectChanges();
    expect(component.status).toEqual('loading');
    tick();
    fixture.detectChanges();
    expect(component.status).toEqual('error');
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();
  }));

  it('should show an error with an invalid email', () => {
    // Arrange
    userServiceSpyIsAvailableEmail.mockReturnValue(of({isAvailable: false}));
    setInputValue(fixture, 'input#email', 'nico@mail.com');
    // Act
    fixture.detectChanges();
    // Assert
    expect(component.emailField?.invalid).toBeTruthy();
    expect(userService.isAvailableEmail).toHaveBeenCalledWith('nico@mail.com');
    // reto
    const errorMsg = getText(fixture, 'emailField-not-available');
    expect(errorMsg).toContain('The email is already in use');
  });

});
