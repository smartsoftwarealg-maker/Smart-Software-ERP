import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@muaazh/angular-datepicker';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatCard } from '@angular/material/card';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { TImport } from '@ss/treasury/api-transactions';

@Component({
    selector: 'ss-treasury-import',
    imports: [CommonModule, MatDialogTitle, ReactiveFormsModule, MatFormField, MatLabel, MatLabel, MatFormField, MatDatepickerToggle, MatDatepickerInput, MatDatepicker, MatInput, MatButton, TranslatePipe, MatCheckbox, MatCard, DatePickerComponent, TranslateDirective],
    templateUrl: './transaction-import.component.html',
    styleUrl: './transaction-import.component.scss',
    standalone: true
})
export class TransactionImportComponent {
    private fb = inject(UntypedFormBuilder);

    form = this.fb.group({
        journal: [{ value: '', disabled: true }, Validators.required],
        date: [new Date(), Validators.required],
        from: [null, Validators.required],
        to: [null, Validators.required],
        consolidated: [false]
    });

    constructor(
        private dialogRef: MatDialogRef<TransactionImportComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { importData: TImport, jType: number }
    ) {
        this.form.patchValue({
            journal: this.data.importData.journal
        });
    }

    onImport() {
        if (this.form.valid) {
            const importData = {
                journal: this.data.importData.journal,
                date: this.form.value.date,
                from: this.form.value.from,
                to: this.form.value.to,
                consolidated: this.form.value.consolidated,
                jType: this.data.jType
            };
            this.dialogRef.close({ success: true, importData });
        }
    }

    cancel() {
        this.dialogRef.close({ success: false });
    }
}
