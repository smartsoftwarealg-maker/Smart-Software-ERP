import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '../../common/confirmation-dialog/confirmation-dialog.service';
import {BookingMethod} from '../hotel-api';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-booking-methods-detail',
    templateUrl: './booking-methods-detail.component.html',
    styleUrls: ['./booking-methods-detail.component.scss']
})
export class BookingMethodsDetailComponent implements OnInit {
    public form: FormGroup = null;

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<BookingMethodsDetailComponent>,
        private confirmationSrv: ConfirmationDialogService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        const rec: BookingMethod = this.data.record;
        this.form = this.formBuilder.group({
                id: [rec.id],
                description: [
                    rec.description,
                    Validators.compose([Validators.required, Validators.maxLength(64)])
                ],
                confirmed: [rec.confirmed]
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
