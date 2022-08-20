import { Component, OnDestroy, OnInit } from "@angular/core";
import { ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService } from '@ss/common/api-common';
import { EmployeeOldCareerService, OldCareer } from '@ss/payroll/api-employee';
import { LookupsService } from '@ss/common/api-lookup';

@Component({
    selector: 'ss-emp-old-career-detail',
    templateUrl: './employee-old-career-detail.component.html',
    styleUrls: ['./employee-old-career-detail.component.scss']
})
export class EmployeeOldCareerDetailComponent extends BaseEntityDetailComponent<OldCareer> implements OnInit, OnDestroy {

    entity: OldCareer;

    parentId: number = 0;

    constructor(
        public employeeOldCareerSrv: EmployeeOldCareerService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: UntypedFormBuilder,
        public httpSrv: HttpService,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(employeeOldCareerSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_OLD_CAREERS');
    }

    protected getRouteParam(): Observable<any> {
        return this.route.parent.parent.params
            .pipe(
                switchMap(p => {
                    this.parentId = +p.id;
                    this.employeeOldCareerSrv.setParentId(this.parentId);
                    return super.getRouteParam();
                })
            );
    }

    setupForm(a: OldCareer): UntypedFormGroup {
        this.entity = a;
        return this.form = this.formBuilder.group({
            id: a.id,
            employee: a.employee,
            post: [a.post, Validators.required],
            from_date: [a.from_date, Validators.required],
            to_date: [a.to_date, Validators.required],
            rate: a.rate
        });
    }


    public readForm(): OldCareer {
        const formVal = this.form.value as OldCareer;
        formVal.employee = this.parentId;
        return formVal;
    }
}
