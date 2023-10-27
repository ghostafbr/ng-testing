import {Component, inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {MyValidators} from "../../../utils/validators";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private userService: UserService = inject(UserService);

  form = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], [MyValidators.validateEmailAsync(this.userService)]],
      password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
      confirmPassword: ['', [Validators.required]],
      checkTerms: [false, [Validators.requiredTrue]],
    },
    {
      validators: MyValidators.matchPasswords,
    }
  );

  status: 'loading' | 'success' | 'error' | 'init' = 'init';

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.status = 'loading';
      const value = this.form.value;
      // @ts-ignore   // Revisar bien
      this.userService.create(value)
        .subscribe((resp) => {
          // redirect
          this.status = 'success';
        }, (err) => {
          this.status = 'error';
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get nameField() {
    return this.form.get('name');
  }

  get lastNameField() {
    return this.form.get('lastName');
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  get confirmPasswordField() {
    return this.form.get('confirmPassword');
  }

  get checkTermsField() {
    return this.form.get('checkTerms');
  }

}
