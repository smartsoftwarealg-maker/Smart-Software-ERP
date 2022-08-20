import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AssetsService} from '../assets.service';
import {UntypedFormControl, Validators} from '@angular/forms';

@Component({
    selector: 'ss-duplicate-dialog',
    templateUrl: './duplicate-dialog.component.html',
    styleUrls: ['./duplicate-dialog.component.scss']
})
export class DuplicateDialogComponent implements OnInit {
    assetId = 0;
    processing = false;
    count = new UntypedFormControl(1, Validators.required);

    constructor(private dialogRef: MatDialogRef<DuplicateDialogComponent>,
                private assetSrv: AssetsService,
                @Inject(MAT_DIALOG_DATA) private data: { id: number }) {
        this.assetId = data.id;
    }

    ngOnInit(): void {
    }

    public cancel() {
        this.dialogRef.close({success: false});
    }

    duplicate() {
        this.processing = true;
        this.assetSrv
            .duplicate(this.assetId, this.count.value)
            .subscribe({
                    next: _ => {
                        this.dialogRef.close({success: true});
                    },
                    error: err => {
                        this.dialogRef.close({success: false});
                        throw err;
                    }
                });
    }
}
