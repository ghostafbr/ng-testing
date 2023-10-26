import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RegisterFormComponent} from './register-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UserService} from "../../../services/user.service";
import {getText, mockObservable, queryByClass, setInputValue} from "../../../../testing";
import {generateOneUser} from "../../../models/user.mock";

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userService: UserService;
  let userServiceSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      providers: [UserService],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    });

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);

    userServiceSpy = jest.spyOn(userService, 'create');
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
    // jest.spyOn(userService, 'create').mockResolvedValue(mockUser);
    userServiceSpy.mockReturnValue(mockObservable(mockUser));
    // Act
    component.register(new Event('submit'));
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();
  });

});
