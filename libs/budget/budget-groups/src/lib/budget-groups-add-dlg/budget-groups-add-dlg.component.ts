import { Component, inject, Inject, OnInit } from "@angular/core";
import { FormBuilder, UntypedFormBuilder, Validator, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BudgetGroupTree} from '../budget-groups-api';
import { MatCard } from "@angular/material/card";
import { MatFormField, MatLabel, MatError } from "@angular/material/form-field";
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from "@angular/material/input";

import { MatCheckbox } from "@angular/material/checkbox";
import { MatButton } from "@angular/material/button";
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-budget-groups-add-dlg',
    templateUrl: './budget-groups-add-dlg.component.html',
    styleUrls: ['./budget-groups-add-dlg.component.scss'],
    standalone: true,
    imports: [
    MatCard,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    TranslateDirective,
    MatInput,
    MatError,
    MatCheckbox,
    MatButton,
    TranslatePipe
],
})
export class BudgetGroupsAddDlgComponent {
    private fb = inject(FormBuilder);
    form = this.fb.group({
        id:          [0],
        parentId:    [0],
        accountType: [0],
        disabled:    [false],
        description: [''],
        code:        [''],
    });

    constructor(private dialogRef: MatDialogRef<BudgetGroupsAddDlgComponent>,
                @Inject(MAT_DIALOG_DATA) private data: BudgetGroupTree) {
        this.form = this.fb.group({
            id:          [this.data.id],
            parentId:    [this.data.parentId],
            accountType: [this.data.accountType],
            disabled:    [this.data.disabled],
            description: [this.data.description, [Validators.required, Validators.minLength(4), Validators.maxLength (45)]],
            code:        [this.data.code, [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
        });

    }


    save() {
        this.dialogRef.close(this.form.getRawValue());
    }
    cancel() {
        this.dialogRef.close(null);
    }
}
