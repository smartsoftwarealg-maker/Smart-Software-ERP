import { Component, OnDestroy, OnInit } from "@angular/core";
import { ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService, LoginService } from '@ss/common/api-common';
import { EmployeeDecisionService, Decision } from '@ss/payroll/api-employee';
import { LookupsService } from '@ss/common/api-lookup';

@Component({
    selector: 'ss-emp-decision-detail',
    templateUrl: './employee-decision-detail.component.html',
    styleUrls: ['./employee-decision-detail.component.scss']
})
export class EmployeeDecisionDetailComponent extends BaseEntityDetailComponent<Decision> implements OnInit, OnDestroy {

    entity: Decision;

    parentId: number = 0;

    constructor(
        public employeeDecisionSrv: EmployeeDecisionService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: UntypedFormBuilder,
        public httpSrv: HttpService,
        public confirmationSrv: ConfirmationDialogService,
        public loginSrv: LoginService,
        public lookupsSrv: LookupsService) {
        super(employeeDecisionSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_DECISION');
    }

    protected getRouteParam(): Observable<any> {
        return this.route.parent.parent.params
            .pipe(
                switchMap(p => {
                    this.parentId = +p.id;
                    this.employeeDecisionSrv.setParentId(this.parentId);
                    return super.getRouteParam();
                })
            );
    }

    setupForm(a: Decision): UntypedFormGroup {
        this.entity = a;
        if (!a.id) {
            a.centerId = this.loginSrv.appCtx.center;
        }
        return this.form = this.formBuilder.group({
            id: a.id,
            employee: a.employee,
            centerId: a.centerId,
            dec_reference: [a.dec_reference, Validators.required],
            dec_date: [a.dec_date, Validators.required],
            application_date: [a.application_date, Validators.required],
            application_period: a.application_period,
            dec_motive: a.dec_motive,
            dec_header: a.dec_header
        });
    }


    public readForm(): Decision {
        const formVal = this.form.value as Decision;
        formVal.employee = this.parentId;
        return formVal;
    }
}
