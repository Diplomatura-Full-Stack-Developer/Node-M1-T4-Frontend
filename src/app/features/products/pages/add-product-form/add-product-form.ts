import { Component, computed } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { PRODUCT_FORM_SCHEMA, ProductField, fieldErrorMessage } from '../../validators/product-form.validator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgClass } from '@angular/common';
import { ConfirmDialog } from '../../../../shared/ui/confirm-dialog/confirm-dialog';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product-form',
  imports: [ReactiveFormsModule, MatDialogModule, NgClass],
  templateUrl: './add-product-form.html',
})
export class AddProductForm {
  title: string = 'Nuevo producto';

  private formBuilder = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private productService = inject(ProductService);
  private router = inject(Router);

  error = this.productService.error;

  productForm = this.formBuilder.group({
    category: ['', PRODUCT_FORM_SCHEMA.category.validators],
    brand: ['', PRODUCT_FORM_SCHEMA.brand.validators],
    model: ['', PRODUCT_FORM_SCHEMA.model.validators],
    price: ['', PRODUCT_FORM_SCHEMA.price.validators],
    offer: false,
    discount: ['', PRODUCT_FORM_SCHEMA.discount.validators],
    stock: ['', PRODUCT_FORM_SCHEMA.stock.validators],
    imageUrl: '',
    features: ['', PRODUCT_FORM_SCHEMA.features.validators],
    deleted: false,
    createdAt: new Date(),
  });

  isInvalid(field: ProductField): boolean {
    const control = this.productForm.controls[field];
    return control.touched && control.invalid;
  }

  errorMessage(field: ProductField): string | null {
    return fieldErrorMessage(field, this.productForm.controls[field]);
  }

  onSubmit() {
    if (this.productForm.invalid) {
      console.log('Formulario inválido');
      this.productForm.markAllAsTouched();
      return;
    }

    const { createdAt } = this.productForm.value;

    this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Producto agregado correctamente',
        message: createdAt,
      },
      restoreFocus: false,
    }).afterClosed().subscribe(() => {
      this.productForm.reset();
    });

    this.productService.addProduct({
      ...this.productForm.value,
      id: crypto.randomUUID(),
      deleted: false,
      createdAt: new Date(),
      features: this.productForm.value.features?.toString().split(',') || [],
      imageUrl: '/images/products/no-image.jpg',
    } as unknown as IProduct);

    this.router.navigate(['/']);
  }
}

export default AddProductForm;
