import { Component, OnDestroy, OnInit } from "@angular/core";
import { ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Career, EmployeeCareerService } from '@ss/payroll/api-employee';
import {Post, LookupsService, Department, Division, Service, Category, Lookup} from '@ss/common/api-lookup';
import {Grid} from '../../../../salary-grid/src/lib/grid-api';
import {GridService} from '../../../../salary-grid/src/lib/grid.service';


@Component({
    selector: 'ss-emp-career-detail',
    templateUrl: './employee-career-detail.component.html',
    styleUrls: ['./employee-career-detail.component.scss']
})
export class EmployeeCareerDetailComponent extends BaseEntityDetailComponent<Career> implements OnInit, OnDestroy {

    entity: Career;
    posts: Post[] = [];
    departments: Department[] = [];
    divisions: Division[] = [];
    services: Service[] = [];
    categories: Category[] = [];
    salaryGrid: Lookup[] = [];
    workshops: Lookup[] = [];

    constructor(
        public employeeCareerSrv: EmployeeCareerService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public httpSrv: HttpService,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private gridService: GridService) {
        super(employeeCareerSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_CAREER');
    }

    protected getRouteParam(): Observable<any> {
        return this.route.parent.parent.params
            .pipe(
                switchMap(p => {
                    const parentId = +p.id;
                    this.employeeCareerSrv.setParentId(parentId);
                    return super.getRouteParam();
                })
            );
    }

    setupForm(a: Career): FormGroup {
        this.entity = a;
        return this.form = this.formBuilder.group({
            id: a.id,
            employee: a.employee || this.employeeCareerSrv.getParentId(),
            paymonthY: [Math.floor(a.paymonth / 100), Validators.required],
            paymonthM: [a.paymonth % 100, Validators.required],
            post: [a.post, Validators.required],
            division: a.division,
            department: a.department,
            service: a.service,
            workshop: a.workshop,
            salary_grid: a.salary_grid,
            prof_category: a.prof_category,
            salary_rank: a.salary_rank,
            from_date: [a.from_date],
            to_date: a.to_date,
            trial_period: [a.trial_period || 0, Validators.required],
            decision: a.decision,
            decision_date: a.decision_date
        });
    }

    preload(): Observable<any> {
        return this.lookupsSrv.getPosts()
            .pipe(
                tap(posts => this.posts = posts),
                switchMap(() => this.lookupsSrv.getWorkshops()),
                tap(list => this.workshops = list),
                switchMap(() => this.lookupsSrv.getDepartments()),
                tap(list => this.departments = list),
                switchMap(() => this.lookupsSrv.getDivisions()),
                tap(list => this.divisions = list),
                switchMap(() => this.lookupsSrv.getServices()),
                tap(list => this.services = list),
                switchMap(() => this.lookupsSrv.getCategories()),
                tap(list => this.categories = list),
                switchMap(_ => this.gridService.getList(0, 50)),
                tap(res => this.salaryGrid = res.body.map(g => {
                    return { id: g.id, description: g.category + '/' + g.sec};
                }))
            );
    }

    public readForm(): Career {
        const formVal = this.form.value;
        const val: Career = formVal;
        val.paymonth = formVal.paymonthY * 100 + formVal.paymonthM;
        delete formVal.paymonthY;
        delete formVal.paymonthM;
        return formVal;
    }
}
