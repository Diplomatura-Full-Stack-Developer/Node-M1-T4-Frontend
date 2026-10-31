import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgClass } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  USER_FORM_SCHEMA, UserField, fieldErrorMessage
    as fieldErrorMessageUser
} from '../../validators/user-form.validator';
import { IUser } from '../../interfaces/user.interface';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, MatDialogModule, NgClass],
  templateUrl: './register.html',
})
export class Register {

  title: string = 'Registro de usuario';

  private formBuilder = inject(FormBuilder);
  private dialog = inject(MatDialog); // TODO: Implementar el dialog de confirmación
  private userService = inject(UserService);
  private router = inject(Router);

  error = this.userService.error;

  userForm = this.formBuilder.group({
    name: ['', USER_FORM_SCHEMA.name.validators],
    email: ['', USER_FORM_SCHEMA.email.validators],
    password: ['', USER_FORM_SCHEMA.password.validators],
  });

  isInvalid(field: UserField): boolean {
    const control = this.userForm.controls[field];
    return control.touched && control.invalid;
  }

  errorMessage(field: UserField): string | null {
    return fieldErrorMessageUser(field, this.userForm.controls[field]);
  }

  onSubmit() {
    if (this.userForm.invalid) {
      console.log('Formulario inválido');
      this.userForm.markAllAsTouched();
      return;
    }

    const user: IUser = {
      ...this.userForm.value,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    } as unknown as IUser;


    this.userService.registerUser(user);
    this.userForm.reset();
    this.router.navigate(['']);
  }
}

export default Register;
