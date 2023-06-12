import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Child, EmployeeChildrenService } from '@ss/payroll/api-employee';
import { Post, LookupsService, Department, Division, Service, Category } from '@ss/common/api-lookup';

@Component({
    selector: 'ss-emp-child-detail',
    templateUrl: './employee-child-detail.component.html',
    styleUrls: ['./employee-child-detail.component.scss']
})
export class EmployeeChildDetailComponent extends BaseEntityDetailComponent<Child> implements OnInit, OnDestroy {

    entity: Child;
    posts: Post[] = [];
    departments: Department[] = [];
    divisions: Division[] = [];
    services: Service[] = [];
    categories: Category[] = [];

    parentId = 0;

    constructor(
        public employeeChildrenSrv: EmployeeChildrenService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public httpSrv: HttpService,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(employeeChildrenSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_CHILDREN');
    }

    protected override getRouteParam(): Observable<any> {
        return this.route.parent.parent.params
            .pipe(
                switchMap(p => {
                    this.parentId = +p['id'];
                    this.employeeChildrenSrv.setParentId(this.parentId);
                    return super.getRouteParam();
                })
            );
    }

    override setupForm(a: Child): UntypedFormGroup {
        this.entity = a;
        return this.form = this.formBuilder.group({
            id: a.id,
            employee: a.employee,
            name: [a.name, Validators.required],
            sex: a.sex,
            birthPlace: a.birthPlace,
            birthDate: a.birthDate
        });
    }

    public override readForm(): Child {
        const formVal = this.form.value as Child;
        formVal.employee = this.parentId;
        return formVal;
    }
}
