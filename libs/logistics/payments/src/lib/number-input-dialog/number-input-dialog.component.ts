import { Component, inject, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe, TranslateDirective } from '@ss/common/ui-lang';

export interface NumberInputDialogData {
  title: string;
  label: string;
  initialValue?: number;
  minValue?: number;
  maxValue?: number;
}

@Component({
  selector: 'ss-number-input-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslatePipe,
    TranslateDirective,
    MatDialogActions,
    MatDialogContent
  ],
  templateUrl: './number-input-dialog.component.html',
  styleUrls: ['./number-input-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberInputDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<NumberInputDialogComponent>);

  form!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: NumberInputDialogData) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      value: [
        this.data.initialValue,
        [
          Validators.required,
          Validators.pattern(/^-?\d*\.?\d+$/) // Allows for decimal numbers
        ]
      ]
    });
  }

  onConfirm(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.get('value')?.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
