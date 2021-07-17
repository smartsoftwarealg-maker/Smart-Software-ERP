import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ConfirmationDialogService} from '../../common/confirmation-dialog/confirmation-dialog.service';
import {RoomOption} from '../hotel-api';

@Component({
    selector: 'app-room-options-detail',
    templateUrl: './room-options-detail.component.html',
    styleUrls: ['./room-options-detail.component.scss']
})
export class RoomOptionsDetailComponent implements OnInit {
    public form: FormGroup = null;

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<RoomOptionsDetailComponent>,
        private confirmationSrv: ConfirmationDialogService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        const rec: RoomOption = this.data.record;
        this.form = this.formBuilder.group({
                id: [rec.id],
                description: [
                    rec.description,
                    Validators.compose([Validators.required, Validators.maxLength(32)])
                ]
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
