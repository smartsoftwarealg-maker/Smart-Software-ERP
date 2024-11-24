import { Component, inject, Inject } from "@angular/core";
import { FormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BudgetPlanningTree} from '../budget-planning-api';
import {BudgetService} from '@ss/budget/budget';
import { MatCard } from "@angular/material/card";
import { MatFormField, MatLabel, MatError } from "@angular/material/form-field";
import { TranslateDirective } from "../../../../../common/ui-lang/src/lib/translate.directive";
import { MatInput } from "@angular/material/input";
import { NgIf } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { TranslatePipe } from "../../../../../common/ui-lang/src/lib/translate.pipe";

@Component({
    selector: 'ss-budget-planning-add-dlg',
    templateUrl: './budget-planning-add-dlg.component.html',
    styleUrls: ['./budget-planning-add-dlg.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        NgIf,
        MatError,
        MatButton,
        TranslatePipe,
    ],
})
export class BudgetPlanningAddDlgComponent {
    private budgetSrv = inject(BudgetService);
    private fb = inject(FormBuilder);
    form: UntypedFormGroup = this.fb.group({
        id:           [0],
        groupId:      [0],
        budgetId:     [0],
        amount:       [0],
        reqAmount:    [0],
        acceptQty:    [0],
        reqQty:       [0],
        complement:   [0],
        acceptAmount: [0],
        closingAmount:[0],
        description:  [0],
        code:         [0],
    });

    constructor(private dialogRef: MatDialogRef<BudgetPlanningAddDlgComponent>,
                @Inject(MAT_DIALOG_DATA) private data: BudgetPlanningTree) {
        this.form = this.fb.group({
            id:           [this.data.id],
            groupId:      [this.data.groupId],
            budgetId:     [this.data.budgetId || this.budgetSrv.budget?.id],
            amount:       [this.data.amount],
            reqAmount:    [this.data.reqAmount],
            acceptQty:    [this.data.acceptQty],
            reqQty:       [this.data.reqQty],
            complement:   [this.data.complement],
            acceptAmount: [this.data.acceptAmount],
            closingAmount:[this.data.closingAmount],
            description:  [{value: this.data.description, disabled: true}],
            code:         [{value: this.data.code, disabled: true}],
        });

    }


    save() {
        this.dialogRef.close(this.form.getRawValue());
    }
    cancel() {
        this.dialogRef.close(null);
    }
}
