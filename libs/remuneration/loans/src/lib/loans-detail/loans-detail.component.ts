import { Component, inject, OnInit } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Loan } from '../loans-class';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoansService } from '../loans.service';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { ElementTypesService } from '@ss/remuneration/element-types';
import { EmployeeService, PersonAutocompleteClass } from '@ss/employee-services/employee-services';
import {  LoanTypeService } from '@ss/payroll-common';

import { TranslateDirective } from '@ss/common/ui-lang';
import { PaymonthEditorComponent } from '@ss/remuneration/paymonth-editor';

type Period = {
    year: number;
    month: number;
}

@Component({
    selector: 'ss-loans-detail',
    templateUrl: './loans-detail.component.html',
    styleUrls: ['./loans-detail.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    UiAutoCompleteComponent,
    TranslateDirective,
    PaymonthEditorComponent
]
})
export class LoansDetailComponent extends BaseEntityDetailComponent<Loan> {
    private employeeSrv = inject(EmployeeService);
    private loginSrv = inject(LoginService);
    private elementTypeSrv = inject(ElementTypesService);
    private loanSrv = inject(LoanTypeService);
    employeeAutoCompleteModel = new PersonAutocompleteClass(this.employeeSrv);
    loanLookup = new DefaultAutoCompleteModel(this.loanSrv);

    constructor(
        public override entitySrv: LoansService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'PAYROLL_LOANS');
    }

    setupForm(e: Loan): UntypedFormGroup {
        return this.formBuilder.group({
            id:            [e.id || 0],
            employee:      [e.employee || 0],
            centerId:      [e.centerId || this.loginSrv.appCtx.center],
            loan:          [e.loan, Validators.required],
            payMonth:      [e.payMonth, Validators.required],
            monthConsumed: [e.monthConsumed || 0],
            amount:        [e.amount, Validators.required],
            taken_amount:  [{ value: e.taken_amount, disabled: true }],
            paidAmount:    [e.paidAmount || 0, Validators.max(e.amount - e.taken_amount)],
            memo:          [e.memo],
            number:        [e.number, Validators.required],
            date:          [e.date || new Date(), Validators.required]
        });
    }

    override readForm(): Loan {
        const f = super.readForm();
        if (typeof f.payMonth === 'object') {
            const obj: Period = f.payMonth;
            f.payMonth = obj.year * 100 + obj.month;
        }
        return f;
    }
}
