import { ErrorHandler, Injectable, Injector, OnInit } from '@angular/core';
import { MessageComponent } from './message.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

@Injectable()
export class CustomErrorHandler extends ErrorHandler implements OnInit {

    public dialogRef: MatDialogRef<MessageComponent>;
    public matDialog: MatDialog;

    // public override router: Router;

    constructor(public injector: Injector) {
        super();
    }

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
        if (!this.matDialog) {
            this.matDialog = this.injector.get(MatDialog);
        }
        if (this.matDialog) {
            this.dialogRef = this.matDialog.open(MessageComponent, config);
        } else {
            console.error(aError);
        }
    }

    ngOnInit(): void {
        // this.router = this.injector.get(Router);
        this.matDialog = this.injector.get(MatDialog);
    }

}
