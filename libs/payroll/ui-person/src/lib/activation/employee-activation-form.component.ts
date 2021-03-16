import { Component, OnInit, OnDestroy } from "@angular/core";
import { EmployeeActivationUIService } from './employee-activation-ui.service';
import { ShellService, ToolbarButton, SnackBarService } from '@ss/common/ui-shell';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeActivationService, EmployeeActivation } from '@ss/payroll/api-person';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { EmployeeActivationComponent } from './employee-activation.component';
import { UserService, dateStrToYmd, dateToYmdStr } from '@ss/common/api-common';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { EmploymentTypeService, LookupsService, EmploymentType } from '@ss/common/api-lookup';


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
        return this.lookupsSrv.getEmployementTypes()
            .pipe(
                tap(types => this.employmentTypes = types),
                switchMap(() => this.getNewAndVerify())
            );
    }

    getNewAndVerify() {
        return this.employeeActivationSrv.getList(0, 1)
            .pipe(
                tap(list => {
                    if (list.itemCount > 0 && list.body[0].activityStatus === 0) {
                        this.shellSrv.goBack();
                        this.snackBarSrv.showFailureMessage('PAYROLL_ALREADY_ACTIVE');
                    }
                }),
                switchMap(() => of({
                    activityStatus: 0,
                    empId: this.uiSrv.instance.personId,
                    center: this.userSrv.context.center,
                    employmentType: null,
                    hireDate: dateToYmdStr(new Date()),
                    id: 0,
                    inConflict: false,
                    suspended: false,
                    suspensionDate: null
                }))
            )
    }

    setupForm(a: EmployeeActivation) {
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
        const val: EmployeeActivation = this.form.value;
        // just incase
        val.suspended = false;
        val.suspensionDate = null;
        val.activityStatus = 0;
        val.inConflict = false;
        //
        val.id = this.id;
        let obs: Observable<any> = this.id === 0
            ? this.employeeActivationSrv.add(val).pipe(tap(i => { this.id = i; }))
            : this.employeeActivationSrv.update(val);
        this.shellSrv.setLoading(true);
        obs.subscribe(() => {
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
