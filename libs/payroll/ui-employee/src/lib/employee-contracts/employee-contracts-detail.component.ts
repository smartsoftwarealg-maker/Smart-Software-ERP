import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import {HttpService, LoginService} from '@ss/common/api-common';
import {Contract, ContractMotiveService, EmployeeContractService} from '@ss/payroll/api-employee';
import {
    Post,
    LookupsService,
    Department,
    Division,
    Service,
    Category,
    PostService
} from '@ss/common/api-lookup';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';


@Component({
    selector: 'ss-emp-contract-detail',
    templateUrl: './employee-contracts-detail.component.html',
    styleUrls: ['./employee-contracts-detail.component.scss']
})
export class EmployeeContractsDetailComponent extends BaseEntityDetailComponent<Contract> implements OnInit, OnDestroy {
    private postSrv =  inject(PostService);
    private motiveSrv =  inject(ContractMotiveService);
    postLookup = new DefaultAutoCompleteModel(this.postSrv);
    motiveLookup = new DefaultAutoCompleteModel(this.motiveSrv);

    entity: Contract;
    posts: Post[] = [];
    departments: Department[] = [];
    divisions: Division[] = [];
    services: Service[] = [];
    categories: Category[] = [];

    parentId = 0;

    constructor(
        public employeeContractSrv: EmployeeContractService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public httpSrv: HttpService,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private loginSrv: LoginService) {
        super(employeeContractSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_CONTRACTS');
    }

    protected override getRouteParam(): Observable<any> {
        return this.route.parent.parent.params
            .pipe(
                switchMap(p => {
                    this.parentId = +p['id'];
                    this.employeeContractSrv.setParentId(this.parentId);
                    return super.getRouteParam();
                })
            );
    }

    setupForm(a: Contract): UntypedFormGroup {
        this.entity = a;
        return this.form = this.formBuilder.group({
            id: a.id,
            employee: a.employee,
            centerId: a.centerId | this.loginSrv.appCtx.center,
            number: [a.number, Validators.required],
            info: a.info,
            post: [a.post, Validators.required],
            recordNumber: [a.recordNumber, Validators.required],
            date: a.date,
            valid_date: a.valid_date,
            division: a.division,
            department: a.department,
            service: a.service,
            salary_rank: a.salary_rank,
            salarygrid: a.salarygrid,
            fromdate: [a.fromdate, Validators.required],
            todate: [a.todate, Validators.required],
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

    override preload(): Observable<any> {
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

    public override readForm(): Contract {
        const formVal = this.form.value as Contract;
        formVal.employee = this.parentId;
        formVal.centerId = this.loginSrv.appCtx.center;
        return formVal;
    }
}
