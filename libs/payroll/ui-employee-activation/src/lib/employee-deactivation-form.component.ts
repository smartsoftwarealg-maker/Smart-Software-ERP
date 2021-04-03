import { Component, OnDestroy, OnInit } from "@angular/core";
import { ToolbarButton, ShellService, SnackBarService } from '@ss/common/ui-shell';
import { EmploymentType, EmploymentTypeService, LookupsService, SuspensionReason } from '@ss/common/api-lookup';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeActivationUIService } from './employee-activation-ui.service';
import { EmployeeActivationService, EmployeeActivation } from '@ss/payroll/api-person';
import { ActivatedRoute } from '@angular/router';
import { UserService, dateToYmdStr } from '@ss/common/api-common';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { EmployeeActivationComponent } from './employee-activation.component';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';


@Component({
    selector: 'ss-emp-deact-form',
    templateUrl: './employee-deactivation-form.component.html',
    styleUrls: ['./employee-deactivation-form.component.scss']
})
export class EmployeeDeactivationFormComponent implements OnInit, OnDestroy {
    
    employmentTypes: EmploymentType[];
    suspensionReasons: SuspensionReason[];
    public form: FormGroup = null;
    public entity: EmployeeActivation;

    public saveButton: ToolbarButton = {
        icon: 'fas fa-save',
        label: 'COMMON_SAVE',
        disabled: false,
        visible: true,
        keepOnToolbar: true, // save button is too important to hide
        click: () => this.save()
    };

    constructor(public uiSrv: EmployeeActivationUIService,
        public shellSrv: ShellService,
        public employeeActivationSrv: EmployeeActivationService,
        public employmentTypeSrv: EmploymentTypeService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public userSrv: UserService,
        public lookupsSrv: LookupsService,
        public confirmationSrv: ConfirmationDialogService) {
    }

    ngOnInit(): void {
        const parent: EmployeeActivationComponent = this.uiSrv.instance;
        parent.showActivationButtons(false);
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
                switchMap(() => this.lookupsSrv.getSuspensionReasons()),
                tap(reasons => this.suspensionReasons = reasons),
                switchMap(() => this.getNewAndVerify()),
            );
    }

    getNewAndVerify() {
        return this.employeeActivationSrv.getLast()
            .pipe(
                tap(x => {
                    if (!x || x.activityStatus !== 0) {
                        this.shellSrv.goBack();
                        this.snackBarSrv.showFailureMessage('PAYROLL_ALREADY_INACTIVE');
                    }
                })
            )
    }

    setupForm(a: EmployeeActivation) {
        this.entity = a;
        a.suspensionDate = dateToYmdStr(new Date());
        a.suspended = true;
        a.inConflict = false; // default is false
        this.form = this.formBuilder.group({
            id: a.id,
            center: a.center,
            empId: a.empId,
            activityStatus: a.activityStatus,
            hireDate: a.hireDate,
            suspended: a.suspended,
            suspensionDate: [a.suspensionDate, Validators.required],
            suspensionReason: [a.suspensionReason, Validators.required],
            employmentType: a.employmentType,
            inConflict: a.inConflict
        });
        const controls = this.form.controls;
        controls.suspended.disable();
        controls.employmentType.disable();
        controls.hireDate.disable();
    }


    public save() {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            this.snackBarSrv.showFailureMessage('COMMON_FORM_NOT_VALID');
            return;
        }
        const val: EmployeeActivation = this.form.value;
        //
        val.suspended = true;
        val.id = this.entity.id;
        val.hireDate = this.entity.hireDate;
        val.employmentType = this.entity.employmentType;
        val.activityStatus = this.entity.activityStatus;
        this.shellSrv.setLoading(true);
        this.employeeActivationSrv.update(val).subscribe(() => {
            this.snackBarSrv.showSuccessMessage();
            this.uiSrv.instance.refresh();
        }, err => {
            this.snackBarSrv.showFailureMessage();
            this.shellSrv.setLoading(false);
            throw err;
        })
    }

    ngOnDestroy(): void {
        this.shellSrv.removeButton(this.saveButton.label);
        this.uiSrv.instance.refresh();
        this.uiSrv.instance.showActivationButtons(true);
    }
}
