import { Component, OnDestroy, OnInit } from "@angular/core";
import { ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Contract, EmployeeContractService } from '@ss/payroll/api-employee';
import { Post, LookupsService, Department, Division, Service, Category } from '@ss/common/api-lookup';


@Component({
    selector: 'ss-emp-contract-detail',
    templateUrl: './employee-contracts-detail.component.html',
    styleUrls: ['./employee-contracts-detail.component.scss']
})
export class EmployeeContractsDetailComponent extends BaseEntityDetailComponent<Contract> implements OnInit, OnDestroy {

    entity: Contract;
    posts: Post[] = [];
    departments: Department[] = [];
    divisions: Division[] = [];
    services: Service[] = [];
    categories: Category[] = [];

    parentId: number = 0;

    constructor(
        public employeeContractSrv: EmployeeContractService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public httpSrv: HttpService,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(employeeContractSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_CONTRACT');
    }

    protected getRouteParam(): Observable<any> {
        return this.route.parent.parent.params
            .pipe(
                switchMap(p => {
                    this.parentId = +p.id;
                    this.employeeContractSrv.setParentId(this.parentId);
                    return super.getRouteParam();
                })
            );
    }

    setupForm(a: Contract): FormGroup {
        this.entity = a;
        return this.form = this.formBuilder.group({
            id: a.id,
            employee: a.employee,
            centerId: a.centerId,
            number: [a.number, Validators.required],
//            info: a.info,
            post: [a.post, Validators.required],
            recordNumber: [a.recordNumber],
            date: a.date,
            valid_date: a.valid_date,
            division: a.division,
            department: a.department,
            service: a.service,
            salary_rank: a.salary_rank,
            salarygrid: a.salarygrid,
            fromdate: [a.fromdate, Validators.required],
            todate: a.todate,
            trial_period: [a.trial_period, Validators.required],
            related_contract: a.related_contract,
            basesalary: a.basesalary,
            notes: a.notes,
            motive: a.motive,
            cost_center: a.cost_center,
            type: a.ctype,
            project: a.project,
            confirmed: a.confirmed
        });
    }

    preload(): Observable<any> {
        return this.lookupsSrv.getPosts()
            .pipe(
                tap(posts => this.posts = posts),
                switchMap(() => this.lookupsSrv.getDepartments()),
                tap(list => this.departments = list),
                switchMap(() => this.lookupsSrv.getDivisions()),
                tap(list => this.divisions = list),
                switchMap(() => this.lookupsSrv.getServices()),
                tap(list => this.services = list),
                switchMap(() => this.lookupsSrv.getCategories()),
            );
    }

    public readForm(): Contract {
        const formVal = this.form.value as Contract;
        formVal.employee = this.parentId;
        return formVal;
    }
}
