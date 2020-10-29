import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'ss-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
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
