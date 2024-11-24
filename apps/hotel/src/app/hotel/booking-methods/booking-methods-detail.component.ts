import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogService } from '../../common/confirmation-dialog/confirmation-dialog.service';
import { BookingMethod } from '../hotel-api';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateDirective } from '../../../../../../libs/common/ui-lang/src/lib/translate.directive';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { SaveBarComponent } from '../../common/save-bar/save-bar.component';

@Component({
    selector: 'app-booking-methods-detail',
    templateUrl: './booking-methods-detail.component.html',
    styleUrls: ['./booking-methods-detail.component.scss'],
    standalone: true,
    imports: [TranslateDirective, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatCheckbox, SaveBarComponent]
})
export class BookingMethodsDetailComponent implements OnInit {
    public form: UntypedFormGroup = null;

    constructor(
        private formBuilder: UntypedFormBuilder,
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
