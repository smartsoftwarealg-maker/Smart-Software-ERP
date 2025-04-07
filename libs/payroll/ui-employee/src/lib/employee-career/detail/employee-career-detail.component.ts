import { Component, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    ActivePostService, CareerMotiveService
} from '@ss/common/api-lookup';
import {GridService} from '@ss/payroll/salary-grid';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import { EmployeeService, PersonAutocompleteClass } from "@ss/employee-services/employee-services";
import { CostCenterService } from '@ss/logistics/api-cost-center';
import { NgIf, NgFor } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MaterialModule } from '@ss/common/api-common';

@Component({
    selector: 'ss-emp-career-detail',
    templateUrl: './employee-career-detail.component.html',
    styleUrls: ['./employee-career-detail.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        MaterialModule,
        MatMiniFabButton,
        MatCard,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        DatePickerComponent,
        MatSelect,
        MatOption,
        UiAutoCompleteComponent,
        NgFor
    ]
})
export class EmployeeCareerDetailComponent extends BaseChildEntityDetailComponent<Career> {
    private costCenterSrv = inject(CostCenterService);
    private serviceSrv = inject(ServiceService);
    private departmentSrv = inject(DepartmentService);
    private divisionSrv = inject(DivisionService);
    private workshopSrv =  inject(WorkshopService);
    private formBuilder = inject(UntypedFormBuilder);
    private gridService = inject(GridService);
    private careerMotiveSrv = inject(CareerMotiveService);
    private lookupsSrv = inject(LookupsService);
    private employeeSrv = inject(EmployeeService);
    private postSrv =  inject(ActivePostService);

    postLookup = new DefaultAutoCompleteModel(this.postSrv);
    workshopLookup = new DefaultAutoCompleteModel(this.workshopSrv);
    divisionLookup = new DefaultAutoCompleteModel(this.divisionSrv);
    departmentLookup = new DefaultAutoCompleteModel(this.departmentSrv);
    serviceLookup = new DefaultAutoCompleteModel(this.serviceSrv);
    careerMotiveLookup = new DefaultAutoCompleteModel(this.careerMotiveSrv);
    costCenterLookup = new DefaultAutoCompleteModel(this.costCenterSrv);
    salaryGridLookup = new DefaultAutoCompleteModel(this.gridService);

    employeeLookup: PersonAutocompleteClass = new PersonAutocompleteClass(this.employeeSrv);
    // entity: Career;
    posts: Post[] = [];
    departments: Department[] = [];
    divisions: Division[] = [];
    services: Service[] = [];
    categories: Category[] = [];
    salaryGrid: Lookup[] = [];

    constructor(
        public employeeCareerSrv: EmployeeCareerService) {
        super(employeeCareerSrv, 'Career');
        this.postLookup.onObjectSelected = e => this.onPost(e);
    }

    private onPost(p: Post) {
        if (p?.grid) {
            this.form.controls['salary_grid'].setValue(p?.grid);
        }
    }

    setupForm(a: Career): UntypedFormGroup {
        this.preload();
        if (!a.id) {
            this.employeeCareerSrv
                .lastCareer()
                .subscribe(res => {
                    if (res.length > 0) {
                        const c = res[0];
                            this.form.controls['post'].setValue(c.post);
                            this.form.controls['division'].setValue(c.division);
                            this.form.controls['department'].setValue(c.department);
                            this.form.controls['service'].setValue(c.service);
                            this.form.controls['workshop'].setValue(c.workshop);
                            this.form.controls['salary_grid'].setValue(c.salary_grid);
                            this.form.controls['prof_category'].setValue(c.prof_category);
                            this.form.controls['salary_rank'].setValue(c.salary_rank);
                            this.form.controls['from_date'].setValue(c.from_date);
                            this.form.controls['to_date'].setValue(c.to_date);
                            this.form.controls['trial_period'].setValue(c.trial_period);
                            this.form.controls['responsible'].setValue(c.responsible);
                            this.form.controls['cost_center'].setValue(c.cost_center);
                    }
                })
        }
        return this.form = this.formBuilder.group({
            id:            [a.id],
            parentId:      [a.parentId || this.employeeCareerSrv.getParentId()],
            paymonthY:     [Math.floor(a.paymonth / 100), Validators.required],
            paymonthM:     [a.paymonth % 100, Validators.required],
            post:          [a.post, Validators.required],
            division:      [a.division],
            department:    [a.department],
            service:       [a.service],
            workshop:      [a.workshop],
            salary_grid:   [a.salary_grid],
            prof_category: [a.prof_category],
            salary_rank:   [a.salary_rank],
            from_date:     [a.from_date],
            to_date:       [a.to_date],
            trial_period:  [a.trial_period || 0, Validators.required],
            decision:      [a.decision],
            decision_date: [a.decision_date],
            motive:        [a.motive],
            responsible:   [a.responsible],
            cost_center:   [a.cost_center],
        });
    }

    preload() {
        this.lookupsSrv
            .getDepartments()
            .pipe(
                tap(list => this.departments = list),
                switchMap(() => this.lookupsSrv.getDivisions()),
                tap(list => this.divisions = list),
                switchMap(() => this.lookupsSrv.getServices()),
                tap(list => this.services = list),
                switchMap(() => this.lookupsSrv.getCategories()),
                tap(list => this.categories = list),
                switchMap(() => this.gridService.getList(0, 50)),
                tap(res => this.salaryGrid = res.body.map(g => {
                    return { id: g.id, description: g.category + '/' + g.sec};
                }))
            ).subscribe();
    }

    public override readForm(): Career {
        const formVal = this.form.value;
        const val: Career = formVal;
        val.paymonth = (+formVal.paymonthY) * 100 + (+formVal.paymonthM);
        delete formVal.paymonthY;
        delete formVal.paymonthM;
        return val;
    }



}
