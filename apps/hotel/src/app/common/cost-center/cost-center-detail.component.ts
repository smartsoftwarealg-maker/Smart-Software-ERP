import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { CostCenter } from './cost-center';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateDirective } from '../../../../../../libs/common/ui-lang/src/lib/translate.directive';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { SaveBarComponent } from '../save-bar/save-bar.component';

@Component({
    selector: 'app-cost-center-detail',
    templateUrl: './cost-center-detail.component.html',
    styleUrls: ['./cost-center-detail.component.scss'],
    standalone: true,
    imports: [TranslateDirective, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, SaveBarComponent]
})
export class CostCenterDetailComponent implements OnInit {
    public form: UntypedFormGroup = null;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private dialogRef: MatDialogRef<CostCenterDetailComponent>,
        private confirmationSrv: ConfirmationDialogService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        const rec: CostCenter = this.data.record;
        this.form = this.formBuilder.group({
            id: [rec.id],
            code: [
                rec.code,
                Validators.compose([Validators.required, Validators.maxLength(12)])
            ],
            description: [
                rec.description,
                Validators.compose([Validators.required, Validators.maxLength(64)])
            ],
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
