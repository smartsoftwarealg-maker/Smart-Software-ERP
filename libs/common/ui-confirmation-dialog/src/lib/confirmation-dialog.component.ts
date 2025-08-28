import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { TranslateDirective } from '@ss/common/ui-lang';

import { MatButton } from '@angular/material/button';

@Component({
    selector: 'ss-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss'],
    standalone: true,
    imports: [TranslateDirective, MatDialogContent, MatDialogActions, MatButton]
})
export class ConfirmationDialogComponent {

    public title: string;
    public message: string;

    constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.title = data.title || 'COMMON_CONFIRMATION';
        this.message = data.message;
    }

    no() {
        this.close(false);
    }

    yes() {
        this.close(true);
    }

    close(b: boolean) {
        this.dialogRef.close(b);
    }
}
