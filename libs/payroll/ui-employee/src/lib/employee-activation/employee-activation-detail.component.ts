import { Component, OnDestroy, OnInit } from "@angular/core";
import { ToolbarButton, ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { EmploymentType, EmploymentTypeService, LookupsService, SuspensionReason } from '@ss/common/api-lookup';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeActivationService, EmployeeActivation } from '@ss/payroll/api-employee';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService } from '@ss/common/api-common';


@Component({
    selector: 'ss-emp-activ-detail',
    templateUrl: './employee-activation-detail.component.html',
    styleUrls: ['./employee-activation-detail.component.scss']
})
export class EmployeeActivationDetailComponent extends BaseEntityDetailComponent<EmployeeActivation> implements OnInit, OnDestroy {

    entity: EmployeeActivation;
    employmentTypes: EmploymentType[];
    suspensionReasons: SuspensionReason[];

    constructor(
        public employeeActivationSrv: EmployeeActivationService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public httpSrv: HttpService,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(employeeActivationSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_EDIT_EMPLOYEE');
    }

    protected getRouteParam(): Observable<any> {
        return this.route.parent.parent.params
            .pipe(
                switchMap(p => {
                    const parentId = +p.id;
                    console.log('parentId = ' + parentId);
                    this.employeeActivationSrv.setParentId(parentId);
                    return super.getRouteParam();
                })
            );
    }

    setupForm(a: EmployeeActivation): FormGroup {
        this.entity = a;
        return this.formBuilder.group({
            id: a.id,
            centerId: a.centerId,
            empId: a.empId,
            activityStatus: a.activityStatus,
            hireDate: a.hireDate,
            suspended: a.suspended,
            suspensionDate: a.suspended ? [a.suspensionDate, Validators.required] : null,
            suspensionReason: a.suspended ? [a.suspensionReason, Validators.required] : null,
            employmentType: a.employmentType,
            inConflict: a.inConflict
        });
    }

    preload(): Observable<any> {
        return this.lookupsSrv.getEmploymentTypes()
            .pipe(
                tap((types: any[]) => this.employmentTypes = types),
                switchMap(() => this.lookupsSrv.getSuspensionReasons()),
                tap((reasons: any[]) => this.suspensionReasons = reasons),
            );
    }

}
