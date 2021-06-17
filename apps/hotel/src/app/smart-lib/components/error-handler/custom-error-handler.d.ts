import { ErrorHandler, Injector, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MessageComponent } from './message.component';
export declare class CustomErrorHandler extends ErrorHandler implements OnInit {
    injector: Injector;
    dialogRef: MatDialogRef<MessageComponent>;
    matDialog: MatDialog;
    constructor(injector: Injector);
    handleError(error: any): void;
    openMessage(error: any): void;
    ngOnInit(): void;
}
