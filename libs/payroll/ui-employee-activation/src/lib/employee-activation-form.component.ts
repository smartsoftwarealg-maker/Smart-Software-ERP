import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeActivationUIService } from './employee-activation-ui.service';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeActivation, EmployeeActivationService } from '@ss/payroll/api-employee';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { EmployeeActivationComponent } from './employee-activation.component';
import { dateToYmdStr, LoginService } from '@ss/common/api-common';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { EmploymentType, EmploymentTypeService, LookupsService } from '@ss/common/api-lookup';


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

    constructor(public uiSrv: EmployeeActivationUIService,
        public shellSrv: ShellService,
        public employeeActivationSrv: EmployeeActivationService,
        public employmentTypeSrv: EmploymentTypeService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public lookupsSrv: LookupsService,
        public confirmationSrv: ConfirmationDialogService,
        private loginSrv: LoginService) { }

    ngOnInit(): void {
        const parent: EmployeeActivationComponent = this.uiSrv.instance;
        parent.showActivationButtons(false);
        this.id = 0;
        this.employeeActivationSrv.setParentId(parent.personId);
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

    load(): Observable<EmployeeActivation> {
        return this.lookupsSrv.getEmploymentTypes()
            .pipe(
                tap(types => this.employmentTypes = types),
                switchMap(() => this.getNewAndVerify())
            );
    }

    getNewAndVerify() {
        return this.employeeActivationSrv.getLast()
            .pipe(
                tap(x => {
                    if (!!x && x.activityStatus === 0) {
                        this.shellSrv.goBack();
                        this.snackBarSrv.showFailureMessage('PAYROLL_ALREADY_ACTIVE');
                    }
                }),
                switchMap(() => of({
                    activityStatus: 0,
                    empId: this.uiSrv.instance.personId,
                    centerId: this.loginSrv.appCtx.center,
                    employmentType: null,
                    hireDate: dateToYmdStr(new Date()),
                    id: 0,
                    inConflict: false,
                    suspensionReason: null,
                    suspended: false,
                    suspensionDate: null
                }))
            )
    }

    setupForm(a: EmployeeActivation) {
        this.form = this.formBuilder.group({
            id: a.id,
            centerId: a.centerId,
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
        const val: EmployeeActivation = this.form.value;
        // just incase
        val.suspended = false;
        val.suspensionDate = null;
        val.activityStatus = 0;
        val.inConflict = false;
        //
        val.id = this.id;
        const obs: Observable<any> = this.id === 0
            ? this.employeeActivationSrv.add(val).pipe(tap(i => { this.id = i; }))
            : this.employeeActivationSrv.update(val);
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
        this.uiSrv.instance.showActivationButtons(true);
    }
}
