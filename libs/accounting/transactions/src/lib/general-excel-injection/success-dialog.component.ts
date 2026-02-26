import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { XITotal } from '@ss/accounting/accounting-api';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';

@Component({
    selector: 'app-dialog',
    templateUrl: './success-dialog.component.html',
    styleUrls: ['./success-dialog.component.scss'],
    imports: [TranslateDirective, MatMiniFabButton],
})
export class SuccessDialogComponent {
    difference: number;
    constructor(
        public dialogRef: MatDialogRef<SuccessDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: XITotal,
    ) {
        this.difference = data.credit - data.debit;
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    protected readonly close = close;
}
