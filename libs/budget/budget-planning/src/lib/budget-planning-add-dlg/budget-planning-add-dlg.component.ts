import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BudgetGroupTree} from '../../../../budget-groups/src/lib/budget-groups-api';
import {BudgetPlanningTree} from '../budget-planning-api';
import {BudgetService} from '@ss/budget/budget';

@Component({
    selector: 'ss-budget-planning-add-dlg',
    templateUrl: './budget-planning-add-dlg.component.html',
    styleUrls: ['./budget-planning-add-dlg.component.scss'],
})
export class BudgetPlanningAddDlgComponent implements OnInit {
    form = this.fb.group({
        id:           [this.data.id],
        groupId:      [this.data.groupId],
        budgetId:     [this.data.budgetId || this.budgetSrv.budget?.id],
        amount:       [this.data.amount],
        reqAmount:    [this.data.reqAmount],
        acceptQty:    [this.data.acceptQty],
        reqQty:       [this.data.reqQty],
        acceptAmount: [this.data.acceptAmount],
        description:  [{value: this.data.description, disabled: true}],
        code:         [{value: this.data.code, disabled: true}],
    });

    constructor(private dialogRef: MatDialogRef<BudgetPlanningAddDlgComponent>,
                private budgetSrv: BudgetService,
                private fb: UntypedFormBuilder,
                @Inject(MAT_DIALOG_DATA) private data: BudgetPlanningTree) {}

    ngOnInit(): void {}

    save() {
        this.dialogRef.close(this.form.getRawValue());
    }
    cancel() {
        this.dialogRef.close(null);
    }
}
