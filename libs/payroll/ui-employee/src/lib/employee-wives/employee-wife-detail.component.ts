import { Component, OnDestroy, OnInit } from "@angular/core";
import { ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Wife, EmployeeWivesService } from '@ss/payroll/api-employee';
import { Post, LookupsService, Department, Division, Service, Category } from '@ss/common/api-lookup';


@Component({
    selector: 'ss-emp-wife-detail',
    templateUrl: './employee-wife-detail.component.html',
    styleUrls: ['./employee-wife-detail.component.scss']
})
export class EmployeeWifeDetailComponent extends BaseEntityDetailComponent<Wife> implements OnInit, OnDestroy {

    entity: Wife;
    posts: Post[] = [];
    departments: Department[] = [];
    divisions: Division[] = [];
    services: Service[] = [];
    categories: Category[] = [];

    parentId: number = 0;

    constructor(
        public employeeWivesSrv: EmployeeWivesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public httpSrv: HttpService,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(employeeWivesSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_WIVES');
    }

    protected getRouteParam(): Observable<any> {
        return this.route.parent.parent.params
            .pipe(
                switchMap(p => {
                    this.parentId = +p.id;
                    this.employeeWivesSrv.setParentId(this.parentId);
                    return super.getRouteParam();
                })
            );
    }

    setupForm(a: Wife): FormGroup {
        this.entity = a;
        return this.form = this.formBuilder.group({
            id: a.id,
            employee: a.employee,
            birthdate: a.birthdate,
            birthPlace: a.birthPlace,
            name: [a.name, Validators.required],
            name_ar: a.name_ar,
            father: a.father,
            father_ar: a.father_ar,
            mother: a.mother,
            mother_ar: a.mother_ar
        });
    }

    public readForm(): Wife {
        const formVal = this.form.value as Wife;
        formVal.employee = this.parentId;
        return formVal;
    }
}
