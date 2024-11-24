import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogService } from '../../common/confirmation-dialog/confirmation-dialog.service';
import { ChargingCost, RoomType } from '../hotel-api';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateDirective } from '../../../../../../libs/common/ui-lang/src/lib/translate.directive';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { SaveBarComponent } from '../../common/save-bar/save-bar.component';

@Component({
    selector: 'app-charging-cost-detail',
    templateUrl: './booking-costs-detail.component.html',
    styleUrls: ['./booking-costs-detail.component.scss'],
    standalone: true,
    imports: [TranslateDirective, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, NgFor, MatOption, SaveBarComponent]
})
export class BookingCostDetailComponent implements OnInit {
    public form: UntypedFormGroup = null;
    public roomTypes: RoomType[];

    constructor(
        private formBuilder: UntypedFormBuilder,
        private dialogRef: MatDialogRef<BookingCostDetailComponent>,
        private confirmationSrv: ConfirmationDialogService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        const rec: ChargingCost = this.data.record;
        this.roomTypes = this.data.roomTypes;
        this.form = this.formBuilder.group({
            id: [rec.id],
            description: [
                rec.description,
                Validators.compose([Validators.required, Validators.maxLength(64)])
            ],
            roomType: [rec.roomType, Validators.required],
            costRate: [rec.costRate, Validators.required]
        });
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
