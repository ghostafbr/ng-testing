import {FormControl, FormGroup} from '@angular/forms';
import {MyValidators} from './validators';
import {UserService} from "../services/user.service";
import {of} from "rxjs";
import {TestBed} from "@angular/core/testing";
import {ProductsService} from "../services/products.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('Tests for MyValidators', () => {

  describe('Test for validPassword', () => {

    it('should return null when password is right', () => {
      // Arrange
      const control = new FormControl();
      control.setValue('ghostafbr123');
      //Act
      const resp = MyValidators.validPassword(control);
      // Assert
      expect(resp).toBeNull();
    });

    it('should return null when password is wrong', () => {
      // Arrange
      const control = new FormControl();
      control.setValue('aaabbbcc');
      //Act
      const resp = MyValidators.validPassword(control);
      // Assert
      expect(resp?.invalid_password).toBe(true);
    });
  });

  describe('Test for matchPasswords', () => {

    it('should return null', () => {
      const group = new FormGroup({
        password: new FormControl('123456'),
        confirmPassword: new FormControl('123456')
      });
      //Act
      const resp = MyValidators.matchPasswords(group);
      // Assert
      expect(resp).toBeNull();
    });

    it('should return obj with the error', () => {
      const group = new FormGroup({
        password: new FormControl('12345612'),
        confirmPassword: new FormControl('1234564545')
      });
      //Act
      const resp = MyValidators.matchPasswords(group);
      // Assert
      expect(resp?.match_password).toBe(true);
    });

    it('should return obj with the error', () => {
      const group = new FormGroup({
        otro: new FormControl('12345612'),
        otro2: new FormControl('12345612')
      });
      const fn = () => {
        MyValidators.matchPasswords(group);
      }
      // Assert
      expect(fn).toThrow(new Error('matchPasswords: fields not found'));
    });

  });

  describe('test for matchPasswords', () => {
    let userService: UserService;
    let userServiceSpy: jest.SpyInstance;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [UserService],
        imports: [HttpClientTestingModule]
      });

      userService = TestBed.inject(UserService);
      userServiceSpy = jest.spyOn(userService, 'isAvailableEmail');
    });

    it('should return null with valid email', (doneFn) => {
      // Arrange
      const control = new FormControl('test@test.com');
      // Act
      userServiceSpy.mockReturnValue(of({isAvailable: true}));
      const validator = MyValidators.validateEmailAsync(userService);
      validator(control).subscribe((resp) => {
        // Assert
        expect(resp).toBeNull();
        expect(userServiceSpy).toHaveBeenCalled();
        doneFn();
      });

    });
  });
});
