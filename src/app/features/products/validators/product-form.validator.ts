import { Validators } from '@angular/forms';
import type { AbstractControl } from '@angular/forms';

export const PRODUCT_FORM_SCHEMA = {
  category: {
    validators: [Validators.required, Validators.minLength(3)],
    messages: {
      required: 'La categoría es obligatoria.',
      minlength: 'La categoría debe tener al menos 3 caracteres.',
    },
  },
  brand: {
    validators: [Validators.required, Validators.minLength(3)],
    messages: {
      required: 'La marca es obligatorio.',
      minlength: 'La marca debe tener al menos 3 caracteres.',
    },
  },
  model: {
    validators: [Validators.required, Validators.minLength(3)],
    messages: {
      required: 'El modelo es obligatorio.',
      minlength: 'El modelo debe tener al menos 3 caracteres.',
    },
  },
  price: {
    validators: [Validators.required, Validators.min(0)],
    messages: {
      required: 'El precio es obligatorio.',
      min: 'El precio debe ser mayor a 0.',
    },
  },
  stock: {
    validators: [Validators.required, Validators.min(0)],
    messages: {
      required: 'El stock es obligatorio.',
      min: 'El stock debe ser mayor a 0.',
    },
  },
  features: {
    validators: [Validators.required],
    messages: {
      required: 'Las características son obligatorias.',
    },
  },
  discount: {
    validators: [Validators.required, Validators.min(0), Validators.max(100)],
    messages: {
      required: 'El descuento es obligatorio.',
      min: 'El descuento debe ser mayor a 0.',
      max: 'El descuento debe ser menor a 100.',
    },
  },
} as const;

export type ProductField = keyof typeof PRODUCT_FORM_SCHEMA;

export function fieldErrorMessage(
  field: ProductField,
  control: AbstractControl | null,
): string | null {
  if (!control?.touched || !control.errors) {
    return null;
  }

  const errorKey = Object.keys(control.errors)[0];
  const messages: Record<string, string> = PRODUCT_FORM_SCHEMA[field].messages;
  return messages[errorKey] ?? null;
}
