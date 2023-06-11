import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService, LoginService } from '@ss/common/api-common';
import {EmployeeDecisionService, Decision, MotiveService, DecisionMotiveService} from '@ss/payroll/api-employee';
import { LookupsService } from '@ss/common/api-lookup';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-emp-decision-detail',
    templateUrl: './employee-decision-detail.component.html',
    styleUrls: ['./employee-decision-detail.component.scss']
})
export class EmployeeDecisionDetailComponent extends BaseEntityDetailComponent<Decision> implements OnInit, OnDestroy {
    decisionLookup = new DefaultAutoCompleteModel(this.motiveSrv);

    entity: Decision;

    parentId = 0;

    constructor(
        public employeeDecisionSrv: EmployeeDecisionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public httpSrv: HttpService,
        public override confirmationSrv: ConfirmationDialogService,
        public loginSrv: LoginService,
        public lookupsSrv: LookupsService,
        private motiveSrv: DecisionMotiveService) {
        super(employeeDecisionSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_DECISIONS');
    }

    protected override getRouteParam(): Observable<any> {
        return this.route.parent.parent.params
            .pipe(
                switchMap(p => {
                    this.parentId = +p['id'];
                    this.employeeDecisionSrv.setParentId(this.parentId);
                    return super.getRouteParam();
                })
            );
    }

    override setupForm(a: Decision): UntypedFormGroup {
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


    public override readForm(): Decision {
        const formVal = this.form.value as Decision;
        formVal.employee = this.parentId;
        return formVal;
    }
}
