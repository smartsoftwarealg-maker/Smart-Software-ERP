import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AssetsService} from '@ss/assets-component';
import {UntypedFormControl, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { RouterModule } from '@angular/router';
import { CustomAttributesModule } from '@ss/custom-attributes';
import { AppArchiveModule } from '@ss/common/app-archive';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
    selector: 'ss-duplicate-dialog',
    templateUrl: './duplicate-dialog.component.html',
    styleUrls: ['./duplicate-dialog.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        CommonUiImageInputModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,
        AppArchiveModule,
        QRCodeModule
    ]

})
export class DuplicateDialogComponent {
    assetId = 0;
    processing = false;
    count = new UntypedFormControl(1, Validators.required);

    constructor(private dialogRef: MatDialogRef<DuplicateDialogComponent>,
                private assetSrv: AssetsService,
                @Inject(MAT_DIALOG_DATA) private data: { id: number }) {
        this.assetId = data.id;
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
