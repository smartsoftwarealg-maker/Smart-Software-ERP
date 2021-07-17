import { ChangeDetectorRef, Component, Inject, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'ss-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent {
    public error = { _body: 'errorBody', status: 0, statusText: 'errorType' };

    constructor(public dialogRef: MatDialogRef<MessageComponent>,
        private ngZone: NgZone,
        private ref: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.error = this.data.error;
        setTimeout(() => {
            if (!this.ref['destroyed']) {
                this.ref.detectChanges();
            }
        }, 1000);
    }


    public onNoClick(): void {
        this.ngZone.run(() => {
            this.dialogRef.close();
        });
    }

}
