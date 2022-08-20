import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-vat-detail',
    templateUrl: './vat-detail.component.html',
    styleUrls: ['./vat-detail.component.scss']
})
export class VatDetailComponent implements OnInit {
    public form: UntypedFormGroup = null;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private dialogRef: MatDialogRef<VatDetailComponent>,
        private confirmationSrv: ConfirmationDialogService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        const rec = this.data.record;
        this.form = this.formBuilder.group({
            id: [rec.id],
            value: [
                rec.value,
                Validators.compose([Validators.required, Validators.min(0.001), Validators.max(100.0)])
            ],
            salesAccount: [rec.salesAccount],
            purchaseAccount: [rec.purchaseAccount]
        }
        );
    }

    close(confirm: boolean): void {
        if (confirm) {
            this.confirmationSrv.confirmDontSave().subscribe(b => {
                if (b) {
                    this.close(false);
                }
            });
        } else {
            this.dialogRef.close();
        }
    }

    save(): void {
        const record = this.form.value;
        this.data.saveFn(record, success => {
            if (success) {
                this.close(false);
            }
        });
    }
}
