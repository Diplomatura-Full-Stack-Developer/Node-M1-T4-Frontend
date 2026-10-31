import { Validators } from '@angular/forms';
import type { AbstractControl } from '@angular/forms';

export const USER_FORM_SCHEMA = {
  name: {
    validators: [Validators.required, Validators.minLength(3)],
    messages: {
      required: 'El nombre es obligatorio.',
      minlength: 'El nombre debe tener al menos 3 caracteres.',
    },
  },
  email: {
    validators: [Validators.required, Validators.minLength(3)],
    messages: {
      required: 'El email es obligatorio.',
      minlength: 'El email debe tener al menos 3 caracteres.',
    },
  },
  password: {
    validators: [Validators.required, Validators.minLength(8)],
    messages: {
      required: 'La contraseña es obligatoria.',
      minlength: 'La contraseña debe tener al menos 8 caracteres.',
    },
  },
} as const;

export type UserField = keyof typeof USER_FORM_SCHEMA;
export type LoginField = 'email' | 'password';

export function fieldErrorMessage(
  field: UserField | LoginField,
  control: AbstractControl | null,
): string | null {
  if (!control?.touched || !control.errors) {
    return null;
  }

  const errorKey = Object.keys(control.errors)[0];
  const messages: Record<string, string> = USER_FORM_SCHEMA[field].messages;
  return messages[errorKey] ?? null;
}
