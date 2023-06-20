import { Component, inject } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Amendment} from '../payroll-amendment.class';
import {ElementsInfoService} from '@ss/remuneration/elementsinfo';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PayrollAmendmentService} from '../payroll-amendment.service';
import {HttpService, LoginService} from '@ss/common/api-common';
import {EmployeeService} from '@ss/payroll/api-employee';
import {ElementInfoLookupModel} from '@ss/remuneration/element-types';
import {PayrollUtil, PersonAutocompleteClass} from '@ss/payroll-common';

@Component({
  selector: 'ss-payroll-amendment-detail',
  templateUrl: './payroll-amendment-detail.component.html',
  styleUrls: ['./payroll-amendment-detail.component.scss']
})
export class PayrollAmendmentDetailComponent extends BaseEntityDetailComponent<Amendment> {
    private httpSrv  = inject(HttpService);
    private employeeSrv  = inject(EmployeeService);
    private loginSrv  = inject(LoginService);

    infoLookupModel = new ElementInfoLookupModel(new ElementsInfoService(this.httpSrv));
    employeeAutoCompleteModel = new PersonAutocompleteClass(this.employeeSrv);

    constructor(
        private detailSrv: PayrollAmendmentService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'REMUN_AMENDMENTS');
    }

    setupForm(e: Amendment): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            center: [e.center || this.loginSrv.appCtx.center],
            employee: [e.employee || 0],
            paymonth: [e.paymonth || this.loginSrv.appCtx.payMonth],
            application_month: [e.application_month || 0, Validators.required],
            to: [0],
            element: [e.element || 'e001'],
            elementId: [e.elementId, Validators.required],
            new_value: [e.new_value, Validators.required],
            percentage: [e.percentage || false],
            lastName: [{value: e.lastName, disabled: true}],
            firstName: [{value: e.firstName, disabled: true}]
        });
    }

    private saveMany() {
        const value = this.form.value;
        const range = PayrollUtil.range(value.application_month, value.to);
        delete value.to;
        const list = range.map((e: number) => <Amendment>{
            id: value.id,
            center: value.center,
            employee: value.employee,
            paymonth: value.paymonth,
            application_month: e,
            element: value.element,
            new_value: value.new_value,
            percentage: value.percentage
        });

        this.detailSrv
            .insertAll(list)
            .subscribe(res => {
                this.snackBarSrv.showSuccessMessage();
                this.form.reset();
                this.shellSrv.goBack();
            });
    }

    override save() {
        const value = this.form.value;
        if (value.application_month['month']) {
            value.application_month = value.application_month.month + 100 * value.application_month.year;
        }
        if (value.to['month']) {
            value.to = value.to.month + 100 * value.to.year;
        }
        if (PayrollUtil.isValidOrZero(value.application_month) && PayrollUtil.isValidOrZero(value.to)) {
            if (value.to) {
                this.saveMany();
            } else {
                super.save();
            }
        } else {
            this.snackBarSrv.showFailureMessage();
        }
    }
}
