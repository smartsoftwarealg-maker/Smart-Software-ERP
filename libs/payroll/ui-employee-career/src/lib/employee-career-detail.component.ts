import { Component, OnDestroy, OnInit } from '@angular/core';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeCareerService, Career } from '@ss/payroll/api-employee';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { dateToYmdStr, LoginService } from '@ss/common/api-common';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { EmploymentType, EmploymentTypeService, LookupsService } from '@ss/common/api-lookup';
import { EmployeeCareerUIService } from './employee-career-ui.service';
import { EmployeeCareerOverviewComponent } from './empolyee-career-overview.component';


@Component({
    selector: 'ss-emp-act-form',
    templateUrl: './employee-activation-form.component.html',
    styleUrls: ['./employee-activation-form.component.scss']
})
export class EmployeeActivationFormComponent implements OnInit, OnDestroy {

    private id: number;
    employmentTypes: EmploymentType[];
    public form: FormGroup = null;

    public saveButton: ToolbarButton = {
        icon: 'fas fa-save',
        label: 'COMMON_SAVE',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS, // save button is too important to hide
        click: () => this.save()
    };

    constructor(public uiSrv: EmployeeCareerUIService,
        public shellSrv: ShellService,
        public empCareerSrv: EmployeeCareerService,
        public employmentTypeSrv: EmploymentTypeService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public lookupsSrv: LookupsService,
        public confirmationSrv: ConfirmationDialogService,
        private loginSrv: LoginService) { }

    ngOnInit(): void {
        const parent: EmployeeCareerOverviewComponent = this.uiSrv.instance;
        parent.showListControls(false);
        this.id = 0;
        this.empCareerSrv.setParentId(parent.personId);
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
                }, err => {
                    this.shellSrv.showRetry(() => this.init())
                    throw err;
                }
            )
    }

    load(): Observable<Career> {
        return this.lookupsSrv.getPosts()
            .pipe(
                tap(posts => this.posts = this.lookupListToMap(posts)),
                switchMap(() => this.lookupsSrv.getDepartments()),
                tap(list => this.departments = this.lookupListToMap(list)),
                switchMap(() => this.lookupsSrv.getDivisions()),
                tap(list => this.divisions = this.lookupListToMap(list)),
                switchMap(() => this.lookupsSrv.getServices()),
                tap(list => this.services = this.lookupListToMap(list)),
                switchMap(() => this.empCareerSrv.get(???))
            );
    }

    setupForm(a: Career) {
        this.form = this.formBuilder.group({
            id: a.id,
            center: a.center,
            empId: a.empId,
            activityStatus: a.activityStatus,
            hireDate: [a.hireDate, Validators.required],
            suspended: a.suspended,
            suspensionDate: a.suspensionDate,
            employmentType: [a.employmentType, Validators.required],
            inConflict: a.inConflict
        });
    }

    public save() {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            this.snackBarSrv.showFailureMessage('COMMON_FORM_NOT_VALID');
            return;
        }
        const val: Career = this.form.value;
        //
        val.id = this.id;
        const obs: Observable<any> = this.id === 0
            ? this.empCareerSrv.add(val).pipe(tap(i => { this.id = i; }))
            : this.empCareerSrv.update(val);
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
