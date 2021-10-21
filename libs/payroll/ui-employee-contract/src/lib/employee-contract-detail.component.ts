import { Component, OnDestroy, OnInit } from '@angular/core';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeContractService, Contract } from '@ss/payroll/api-employee';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService } from '@ss/common/api-common';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Post, LookupsService, Department, Division, Service, Category } from '@ss/common/api-lookup';
import { EmployeeContractListUIService } from './employee-contract-lists-ui.service';
import { EmployeeContractOverviewComponent } from './empolyee-contract-overview.component';


@Component({
    selector: 'ss-emp-contract-form',
    templateUrl: './employee-contract-detail.component.html',
    styleUrls: ['./employee-contract-detail.component.scss']
})
export class EmployeeContractDetailComponent implements OnInit, OnDestroy {

    id: number;
    posts: Post[] = [];
    departments: Department[] = [];
    divisions: Division[] = [];
    services: Service[] = [];
    categories: Category[] = [];

    public form: FormGroup = null;

    public saveButton: ToolbarButton = {
        icon: 'fas fa-save',
        label: 'COMMON_SAVE',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS, // save button is too important to hide
        click: () => this.save()
    };

    constructor(public uiSrv: EmployeeContractListUIService,
        public shellSrv: ShellService,
        public empContractSrv: EmployeeContractService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public lookupsSrv: LookupsService,
        public confirmationSrv: ConfirmationDialogService,
        private loginSrv: LoginService) { }

    ngOnInit(): void {
        const parent: EmployeeContractOverviewComponent = this.uiSrv.instance;
        parent.showListControls(false);
        this.id = 0;
        this.empContractSrv.setParentId(parent.personId);
        this.shellSrv.addButton(this.saveButton);
        this.init();
    }

    init() {
        this.shellSrv.setLoading(true);
        this.load()
            .subscribe(
                obj => {
                    this.setupForm(obj);
                    this.shellSrv.setLoading(false);
                },
                err => {
                    this.shellSrv.showRetry(() => this.init())
                    throw err;
                }
            )
    }

    load(): Observable<Contract> {
        return this.route.params
            .pipe(
                tap(params => this.id = +params.id),
                switchMap(() => this.lookupsSrv.getPosts()),
                tap(posts => this.posts = posts),
                switchMap(() => this.lookupsSrv.getDepartments()),
                tap(list => this.departments = list),
                switchMap(() => this.lookupsSrv.getDivisions()),
                tap(list => this.divisions = list),
                switchMap(() => this.lookupsSrv.getServices()),
                tap(list => this.services = list),
                switchMap(() => this.lookupsSrv.getCategories()),
                tap(list => this.categories = list),
                switchMap(() => this.id
                    ? this.empContractSrv.get(this.id) // parentID is set in the parent component
                    : of(this.newContract())
                )
            ) as Observable<Contract>; // dumb compiler
    }

    newContract(): Contract {
        return {
            id: null,
            employee: this.uiSrv.instance.personId,
            paymonth: null,
            post: null,
            division: null,
            department: null,
            service: null,
            salary_grid: null,
            prof_category: null,
            salary_rank: null,
            from_date: null,
            to_date: null,
            trial_period: null
        };
    }

    setupForm(a: Contract) {
        this.form = this.formBuilder.group({
            id: a.id,
            employee: a.employee,
            paymonthY: [Math.floor(a.paymonth / 100), Validators.required],
            paymonthM: [a.paymonth % 100, Validators.required],
            post: [a.post, Validators.required],
            division: a.division,
            department: a.department,
            service: a.service,
            salary_grid: a.salary_grid,
            prof_category: a.prof_category,
            salary_rank: a.salary_rank,
            from_date: [a.from_date, Validators.required],
            to_date: a.to_date,
            trial_period: [a.trial_period, Validators.required]
        });
    }

    public save() {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            this.snackBarSrv.showFailureMessage('COMMON_FORM_NOT_VALID');
            return;
        }
        const formVal = this.form.value;
        const val: Contract = formVal;
        val.paymonth = formVal.paymonthY * 100 + formVal.paymonthM;
        delete formVal.paymonthY;
        delete formVal.paymonthM;
        //
        val.id = this.id;
        const obs: Observable<any> = this.id === 0
            ? this.empContractSrv.add(val).pipe(tap(i => { this.id = i; }))
            : this.empContractSrv.update(val);
        this.shellSrv.setLoading(true);
        obs.subscribe({
            next: () => {
                this.snackBarSrv.showSuccessMessage();
                this.uiSrv.instance.refresh();
            }, error: err => {
                this.snackBarSrv.showFailureMessage();
                this.shellSrv.setLoading(false);
                throw err;
            }
        })
    }

    ngOnDestroy(): void {
        this.shellSrv.removeButton(this.saveButton.label);
        this.uiSrv.instance.refresh();
    }
}
