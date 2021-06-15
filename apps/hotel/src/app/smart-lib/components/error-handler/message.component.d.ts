import { ChangeDetectorRef, NgZone } from '@angular/core';
import { MatDialogRef } from '@angular/material';
export declare class MessageComponent {
    dialogRef: MatDialogRef<MessageComponent>;
    private ngZone;
    private ref;
    data: any;
    error: {
        _body: string;
        status: number;
        statusText: string;
    };
    constructor(dialogRef: MatDialogRef<MessageComponent>, ngZone: NgZone, ref: ChangeDetectorRef, data: any);
    onNoClick(): void;
}
