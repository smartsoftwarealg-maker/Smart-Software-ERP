import { Component, OnDestroy, OnInit } from '@angular/core';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeWivesService, Wife } from '@ss/payroll/api-employee';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService } from '@ss/common/api-common';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Post, LookupsService, Department, Division, Service, Category } from '@ss/common/api-lookup';
import { EmployeeWivesListUIService } from './employee-wives-lists-ui.service';
import { EmployeeWivesOverviewComponent } from './empolyee-wives-overview.component';


@Component({
    selector: 'ss-emp-wives-form',
    templateUrl: './employee-wives-detail.component.html',
    styleUrls: ['./employee-wives-detail.component.scss']
})
export class EmployeeWivesDetailComponent implements OnInit, OnDestroy {

    id: number;

    public form: FormGroup = null;

    public saveButton: ToolbarButton = {
        icon: 'fas fa-save',
        label: 'COMMON_SAVE',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS, // save button is too important to hide
        click: () => this.save()
    };

    constructor(public uiSrv: EmployeeWivesListUIService,
        public shellSrv: ShellService,
        public empWivesSrv: EmployeeWivesService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public lookupsSrv: LookupsService,
        public confirmationSrv: ConfirmationDialogService,
        private loginSrv: LoginService) { }

    ngOnInit(): void {
        const parent: EmployeeWivesOverviewComponent = this.uiSrv.instance;
        parent.showListControls(false);
        this.id = 0;
        this.empWivesSrv.setParentId(parent.personId);
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

    load(): Observable<Wife> {
        return this.route.params
            .pipe(
                tap(params => this.id = +params.id),
                switchMap(() => this.id
                    ? this.empWivesSrv.get(this.id) // parentID is set in the parent component
                    : of(this.newWife())
                )
            ) as Observable<Wife>; // dumb compiler
    }

    newWife(): Wife {
        return {
            id: 0,
            employee: this.uiSrv.instance.personId,
            name: null,
            notDivorced: true
        };
    }

    setupForm(a: Wife) {
        this.form = this.formBuilder.group({
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

    public save() {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            this.snackBarSrv.showFailureMessage('COMMON_FORM_NOT_VALID');
            return;
        }
        const formVal = this.form.value;
        const val: Wife = formVal;
        //
        val.id = this.id;
        const obs: Observable<any> = this.id === 0
            ? this.empWivesSrv.add(val).pipe(tap(i => { this.id = i; }))
            : this.empWivesSrv.update(val);
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
        });
    }

    ngOnDestroy(): void {
        this.shellSrv.removeButton(this.saveButton.label);
        this.uiSrv.instance.refresh();
    }
}
