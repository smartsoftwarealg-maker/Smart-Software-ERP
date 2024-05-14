import { ErrorHandler, inject, Injectable, Injector, OnInit } from '@angular/core';
import { MessageComponent } from './message.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

@Injectable()
export class CustomErrorHandler extends ErrorHandler {
    private matDialog = inject(MatDialog);
    public dialogRef: MatDialogRef<MessageComponent>;

    // public override router: Router;


    // I handle the given error.
    public handleError(error: any): void {

        const unwrappedError = error.originalError || error;
        this.openMessage(unwrappedError);
        // need to log the error in console;
        super.handleError(error);
        // }
    }

    openMessage(aError: any) {
        const config = new MatDialogConfig();
        config.width = '600px';
        config.maxWidth = '100%';
        config.data = { error: aError };
        if (this.matDialog) {
            this.dialogRef = this.matDialog.open(MessageComponent, config);
        } else {
            console.error(aError);
        }
    }

}
