import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
export interface ConfirmDialogData {
  title: string;
  name?: string;
  email?: string;
  message?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, DatePipe],
  templateUrl: './confirm-dialog.html',
})
export class ConfirmDialog {
  readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
}
