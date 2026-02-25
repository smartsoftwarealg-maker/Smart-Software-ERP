import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { XITotal } from '@ss/accounting/accounting-api';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    imports:[TranslateDirective]
})
export class DialogComponent {
    showCredit = false;
    showDebit = false;
    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: XITotal,
    ) {
        this.showCredit = data.credit > 0;
        this.showDebit = data.debit > 0;
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
