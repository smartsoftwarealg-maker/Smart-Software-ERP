import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

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
        this.title = data.title;
        if (!this.title) {
            this.title = 'CONFIRMATION';
        }
        this.message = data.message;
    }

}
