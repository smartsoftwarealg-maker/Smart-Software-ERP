import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Loan} from '../loans-class';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LoansService} from '../loans.service';
import {EmployeeService} from '@ss/payroll/api-employee';
import {LoginService} from '@ss/common/api-common';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {PersonAutocompleteClass} from '@ss/payroll-common';
import {ElementTypesService} from '@ss/remuneration/element-types';

@Component({
  selector: 'ss-loans-detail',
  templateUrl: './loans-detail.component.html',
  styleUrls: ['./loans-detail.component.scss']
})
export class LoansDetailComponent extends BaseEntityDetailComponent<Loan> {
    employeeAutoCompleteModel = new PersonAutocompleteClass(this.employeeSrv);
    loansAutoCompleteModel = new DefaultAutoCompleteModel(this.elementTypeSrv);

    constructor(
        private detailSrv: LoansService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        private employeeSrv: EmployeeService,
        public override confirmationSrv: ConfirmationDialogService,
        private loginSrv: LoginService,
        private elementTypeSrv: ElementTypesService) {
        super(detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'PAYROLL_LOANS');
    }

    setupForm(e: Loan): FormGroup {
        return this.formBuilder.group({
            id: [e.id || 0],
            employee: [e.employee || 0],
            center: [e.center || this.loginSrv.appCtx.center],
            loan: [e.loan, Validators.required],
            payMonth: [e.payMonth, Validators.required],
            monthConsumed: [e.monthConsumed || 0],
            amount: [e.amount, Validators.required],
            taken_amount: [e.taken_amount || 0],
            number: [e.number, Validators.required],
            date: [e.date || new Date(), Validators.required]
        });
    }

    override readForm(): Loan {
        const f = super.readForm();
        console.log(typeof f.payMonth)
        if (typeof f.payMonth === 'object') {
            f.payMonth = f.payMonth['year'] * 100 + f.payMonth['month'];
        }
        return f;
    }
}
