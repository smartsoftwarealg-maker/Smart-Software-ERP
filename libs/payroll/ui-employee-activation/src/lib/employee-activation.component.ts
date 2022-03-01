import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import {HttpService, LanguageService, PaginatorPersistenceService} from '@ss/common/api-common';
import { LookupsService, EmploymentType, SuspensionReason } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ImageModel } from '@ss/common/ui-image-input';
import { ShellService, SnackBarService, ToolbarButton, KeepOnToolbar } from '@ss/common/ui-shell';
import { EmployeeActivation, EmployeeActivationService, EmployeeService, Employee as IEmployee } from '@ss/payroll/api-employee';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { EmployeeActivationUIService } from './employee-activation-ui.service';
import { ACTIVATION_ROUTE_URL, DEACTIVATION_ROUTE_URL } from '@ss/payroll/api-employee';
import { DefaultReportService } from '@ss/common/ui-default-report-component';

// frontend only
interface Employee extends IEmployee {
    fullName?: string;
}

@Component({
    selector: 'ss-employee-activation',
    templateUrl: './employee-activation.component.html',
    styleUrls: ['./employee-activation.component.scss'],
    providers: [EmployeeActivationUIService]
})
export class EmployeeActivationComponent extends BaseEntityListComponent<EmployeeActivation> implements OnInit {

    public activateButton: ToolbarButton = {
        disabled: false,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'PAYROLL_ACTIVATE_EMP',
        icon: 'fas fa-play',
        visible: false,
        click: () => this.activateEmployee()
    };

    public deactivateButton: ToolbarButton = {
        disabled: false,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'PAYROLL_DEACTIVATE_EMP',
        icon: 'fas fa-pause',
        visible: false,
        click: () => this.deactivateEmployee()
    };

    public personId: number;
    public person: Employee;
    public lastLine: EmployeeActivation;
    public imageModel: ImageModel;
    public employmentTypes: { [id: number]: string; };
    public suspensionReasons: { [id: number]: string; };

    constructor(
        public employeeActivationSrv: EmployeeActivationService,
        public uiSrv: EmployeeActivationUIService,
        public employeeSrv: EmployeeService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public lookupsSrv: LookupsService,
        public langSrv: LanguageService,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public httpSrv: HttpService,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(employeeActivationSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'PAYROLL_EMPLOYEE_ACTIVATION_SUSPENSION');
        this.imageModel = new ImageModel(httpSrv);
        this.imageModel.readOnly = true;
        this.pagination.pageSize = 50; // todo: make this unlimited in backend
        uiSrv.instance = this;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.personId = +params.id;
            this.imageModel.setImageUrl(this.employeeSrv.getPhotoUrl(this.personId));
            this.employeeActivationSrv.setParentId(this.personId);
            super.ngOnInit();
            this.initView();
        });
    }

    private initView() {
        this.shellSrv.setButtonVisible(this.deleteButton, false);
        this.shellSrv.setButtonEnabled(this.deleteButton, false);
        this.shellSrv.setButtonVisible(this.addButton, false);
        this.shellSrv.setButtonEnabled(this.addButton, false);
        this.shellSrv.setGoBackPathByRelativeUrl('..');
        this.shellSrv.disableSearch();
        this.shellSrv.setButtons([this.refreshButton, this.activateButton, this.deactivateButton, this.editButton]);
    }

    public preload(): Observable<any> {
        if (!this.personId) {
            return of(null);
        }
        return this.employeeSrv.get(this.personId)
            .pipe(
                tap((p: Employee) => {
                    this.person = p;
                    this.person.birthDate = this.langSrv.formatDate(p.birthDate);
                    this.person.fullName = this.langSrv.formatFullName(p.firstName, p.lastName);
                }),
                switchMap(() => this.lookupsSrv.getEmploymentTypes()),
                tap(list => this.onEmploymentTypesLoaded(list)),
                switchMap(() => this.lookupsSrv.getSuspensionReasons()),
                tap(list => this.onSuspensionReasonLoaded(list))
            );
    }

    onEmploymentTypesLoaded(data: EmploymentType[]): void {
        this.employmentTypes = data.reduce(
            (total: { [id: number]: string; }, currentValue: EmploymentType ) => {
                total[currentValue.id] = currentValue.description;
                return total
            }, {}
        );
    }

    onSuspensionReasonLoaded(data: SuspensionReason[]): void {
        this.suspensionReasons = data.reduce(
            (total: { [id: number]: string; }, currentValue) => {
                total[currentValue.id] = currentValue.description;
                return total
            }, {}
        );
    }

    isActive(): boolean {
        return this.lastLine && this.lastLine.activityStatus == 0;
    }

    isInactive(): boolean {
        return this.lastLine && this.lastLine.activityStatus != 0;
    }

    public processLoadedData(data: EmployeeActivation[]): Observable<EmployeeActivation[]> {
        // todo: sort data by date and find error in hireDates and suspensionDates and
        // tell the user that they are an idiot
        this.lastLine = data[data.length - 1];
        const active = this.isActive();
        this.activateButton.disabled = active;
        this.deactivateButton.disabled = !active;
        this.shellSrv.updateShell();
        return of(data.map(e => {
            const x = e as EmployeeActivation;
            x.hireDate = this.langSrv.formatDate(x.hireDate);
            x.suspensionDate = this.langSrv.formatDate(x.suspensionDate);
            return x;
        }));
    }

    public activateEmployee(id: number = 0) {
        this.refresh(() => {
            this.router.navigate([ACTIVATION_ROUTE_URL], { relativeTo: this.route })
                .then();
        });
    }

    public deactivateEmployee(id: number = 0) {
        this.refresh(() => {
            this.router.navigate([DEACTIVATION_ROUTE_URL], { relativeTo: this.route })
                .then();
        });
    }

    public showActivationButtons(visible: boolean): void {
        this.activateButton.visible = visible;
        this.deactivateButton.visible = visible;
        this.refreshButton.visible = visible;
        this.editButton.visible = visible;
        this.shellSrv.updateShell();
    }
}
