import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Amendment } from '../payroll-amendment.class';
import { ElementsInfoService } from '@ss/remuneration/elementsinfo';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PayrollAmendmentService } from '../payroll-amendment.service';
import { HttpService, LoginService, MaterialModule } from '@ss/common/api-common';
import { ElementInfoLookupModel } from '@ss/remuneration/element-types';
import { PayrollUtil } from '@ss/payroll-common';
import { EmployeeService, PersonAutocompleteClass } from '@ss/employee-services/employee-services';


import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { PaymonthEditorComponent } from '@ss/remuneration/paymonth-editor';
import { Lookup } from '@ss/common/api-lookup';

@Component({
    selector: 'ss-payroll-amendment-detail',
    templateUrl: './payroll-amendment-detail.component.html',
    styleUrls: ['./payroll-amendment-detail.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
    MaterialModule,
    TranslateDirective,
    UiAutoCompleteComponent,
    PaymonthEditorComponent
]

})
export class PayrollAmendmentDetailComponent extends BaseEntityDetailComponent<Amendment> {
    private httpSrv = inject(HttpService);
    private employeeSrv = inject(EmployeeService);
    private loginSrv = inject(LoginService);

    elementLookup = new ElementInfoLookupModel(new ElementsInfoService(this.httpSrv));
    employeeLookup = new PersonAutocompleteClass(this.employeeSrv);

    constructor(
        private detailSrv: PayrollAmendmentService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'REMUN_AMENDMENTS');
        this.elementLookup.onObjectSelected = e => this.form?.controls['element'].setValue(e.field);
    }

    setupForm(e: Amendment): UntypedFormGroup {
        return this.formBuilder.group({
            id:         [e.id],
            center:     [e.center || this.loginSrv.appCtx.center],
            employee:   [e.employee || 0],
            paymonth:   [e.paymonth || this.loginSrv.appCtx.payMonth],
            month_count:[e.month_count||0],
            applicationMonth: [e.applicationMonth || 0, Validators.required],
            to:         [0],
            element:    [e.element || 'e001'],
            elementId:  [e.elementId, Validators.required],
            new_value:  [e.new_value, Validators.required],
            percentage: [e.percentage || 0],
            lastName:   [{ value: e.lastName||'', disabled: true }],
            firstName:  [{ value: e.firstName||'', disabled: true }],
            rounded:    [e.rounded??false]
        });
    }

    private saveMany() {
        const value = this.readForm();
        const range = PayrollUtil.range(value.applicationMonth, value.to);
        delete value.to;
        const list = range.map((e: number) => <Amendment>{
            id: value.id,
            center: value.center,
            employee: value.employee,
            paymonth: value.paymonth,
            applicationMonth: e,
            element: value.element,
            new_value: value.new_value,
            percentage: value.percentage? 1 : 0,
            rounded: value.rounded,
            month_count: value.month_count||0
        });
        this.detailSrv
            .insertAll(list)
            .subscribe({
                next: res => {
                this.snackBarSrv.showSuccessMessage();
                this.form?.reset();
                this.shellSrv.goBack();
            },
                error:  err => {
                    console.error(err);
                    throw err;
                }
            });
    }

    override save() {
        const value = this.readForm();
        if (PayrollUtil.isValidOrZero(value.applicationMonth) && PayrollUtil.isValidOrZero(value.to)) {
            if (value.to) {
                this.saveMany();
            } else {
                super.save();
            }
        } else {
            this.snackBarSrv.showFailureMessage();
        }
    }

    override readForm():Amendment{
        const value = this.form?.getRawValue();
        if (value.applicationMonth['month']) {
            value.applicationMonth = value.applicationMonth.month + 100 * value.applicationMonth.year;
        }
        if (value.to['month']) {
            value.to = value.to.month + 100 * value.to.year;
        }
        return value;
    }
}
