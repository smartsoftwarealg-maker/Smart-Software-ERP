import { Component, OnDestroy, OnInit } from "@angular/core";
import { ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

    parentId: number = 0;

    constructor(
        public employeeChildrenSrv: EmployeeChildrenService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public httpSrv: HttpService,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(employeeChildrenSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_CHILDREN');
    }

    protected getRouteParam(): Observable<any> {
        return this.route.parent.parent.params
            .pipe(
                switchMap(p => {
                    this.parentId = +p.id;
                    this.employeeChildrenSrv.setParentId(this.parentId);
                    return super.getRouteParam();
                })
            );
    }

    setupForm(a: Child): FormGroup {
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

    public readForm(): Child {
        const formVal = this.form.value as Child;
        formVal.employee = this.parentId;
        return formVal;
    }
}
