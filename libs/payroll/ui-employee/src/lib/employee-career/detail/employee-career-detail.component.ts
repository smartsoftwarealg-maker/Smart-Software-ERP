import { Component, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { tap, switchMap } from 'rxjs/operators';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Career, EmployeeCareerService } from '@ss/payroll/api-employee';
import {
    Post,
    LookupsService,
    Department,
    Division,
    Service,
    Category,
    Lookup,
    WorkshopService,
    DivisionService,
    DepartmentService,
    ServiceService,
    ActivePostService
} from '@ss/common/api-lookup';
import {GridService} from '@ss/payroll/salary-grid';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-emp-career-detail',
    templateUrl: './employee-career-detail.component.html',
    styleUrls: ['./employee-career-detail.component.scss']
})
export class EmployeeCareerDetailComponent extends BaseChildEntityDetailComponent<Career> {
    private serviceSrv = inject(ServiceService);
    private departmentSrv = inject(DepartmentService);
    private divisionSrv = inject(DivisionService);
    private workshopSrv =  inject(WorkshopService);
    private formBuilder = inject(UntypedFormBuilder);
    public lookupsSrv = inject(LookupsService);
    private gridService = inject(GridService);

    private postSrv =  inject(ActivePostService);
    postLookup = new DefaultAutoCompleteModel(this.postSrv);
    workshopLookup = new DefaultAutoCompleteModel(this.workshopSrv);
    divisionLookup = new DefaultAutoCompleteModel(this.divisionSrv);
    departmentLookup = new DefaultAutoCompleteModel(this.departmentSrv);
    serviceLookup = new DefaultAutoCompleteModel(this.serviceSrv);

    entity: Career;
    posts: Post[] = [];
    departments: Department[] = [];
    divisions: Division[] = [];
    services: Service[] = [];
    categories: Category[] = [];
    salaryGrid: Lookup[] = [];

    constructor(
        public employeeCareerSrv: EmployeeCareerService) {
        super(employeeCareerSrv);
    }

    setupForm(a: Career): UntypedFormGroup {
        this.preload();
        this.entity = a;
        return this.form = this.formBuilder.group({
            id:         [a.id],
            parentId:   [a.parentId || this.employeeCareerSrv.getParentId()],
            paymonthY:  [Math.floor(a.paymonth / 100), Validators.required],
            paymonthM:  [a.paymonth % 100, Validators.required],
            post:       [a.post, Validators.required],
            division:   [a.division],
            department: [a.department],
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

    preload() {
        this.lookupsSrv.getDepartments()
            .pipe(
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
            ).subscribe();
    }

    public override readForm(): Career {
        const formVal = this.form.value;
        const val: Career = formVal;
        val.paymonth = +(formVal.paymonthY * 100 + formVal.paymonthM);
        delete formVal.paymonthY;
        delete formVal.paymonthM;
        return val;
    }

}
