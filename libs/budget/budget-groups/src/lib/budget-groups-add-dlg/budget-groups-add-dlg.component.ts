import { Component, inject, Inject, OnInit } from "@angular/core";
import { FormBuilder, UntypedFormBuilder, Validator, Validators } from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BudgetGroupTree} from '../budget-groups-api';

@Component({
    selector: 'ss-budget-groups-add-dlg',
    templateUrl: './budget-groups-add-dlg.component.html',
    styleUrls: ['./budget-groups-add-dlg.component.scss'],
})
export class BudgetGroupsAddDlgComponent {
    private fb = inject(FormBuilder);
    form = this.fb.group({
        id:          [this.data.id],
        parentId:    [this.data.parentId],
        accountType: [this.data.accountType],
        disabled:    [this.data.disabled],
        description: [this.data.description, [Validators.required, Validators.minLength(4), Validators.maxLength (45)]],
        code:        [this.data.code, [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    });

    constructor(private dialogRef: MatDialogRef<BudgetGroupsAddDlgComponent>,
                @Inject(MAT_DIALOG_DATA) private data: BudgetGroupTree) {}


    save() {
        this.dialogRef.close(this.form.getRawValue());
    }
    cancel() {
        this.dialogRef.close(null);
    }
}
