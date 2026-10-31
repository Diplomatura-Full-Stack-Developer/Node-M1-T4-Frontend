import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgClass } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  USER_FORM_SCHEMA, LoginField, fieldErrorMessage
    as fieldErrorMessageUser
} from '../../validators/user-form.validator';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatDialogModule, NgClass, RouterLink],
  templateUrl: './login.html',
})
export class Login {

  title: string = 'Iniciar sesión';

  private formBuilder = inject(FormBuilder);
  private dialog = inject(MatDialog); // TODO: Implementar el dialog de confirmación
  private userService = inject(UserService);
  private router = inject(Router);

  error = this.userService.error;

  userForm = this.formBuilder.group({
    email: ['', USER_FORM_SCHEMA.email.validators],
    password: ['', USER_FORM_SCHEMA.password.validators],
  });

  isInvalid(field: LoginField): boolean {
    const control = this.userForm.controls[field];
    return control.touched && control.invalid;
  }

  errorMessage(field: LoginField): string | null {
    return fieldErrorMessageUser(field, this.userForm.controls[field]);
  }

  ngOnInit() {
    this.userService.seedUsers()
  }


  onSubmit() {
    if (this.userForm.invalid) {
      console.log('Formulario inválido');
      this.userForm.markAllAsTouched();
      return;
    }

    this.userService.loginUser(this.userForm.value.email as string, this.userForm.value.password as string);
    this.userForm.reset();
    this.router.navigate(['']);
  }
}

export default Login;
