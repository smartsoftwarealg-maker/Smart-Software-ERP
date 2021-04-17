import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { LookupsService, EmploymentType, SuspensionReason } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ImageModel } from '@ss/common/ui-image-input';
import { LanguageService } from '@ss/common/ui-lang';
import { ShellService, SnackBarService, ToolbarButton, KeepOnToolbar } from '@ss/common/ui-shell';
import { EmployeeActivation, EmployeeActivationService, PersonService, Person as IPerson } from '@ss/payroll/api-person';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { EmployeeActivationUIService } from './employee-activation-ui.service';
import { ACTIVATION_URL, DEACTIVATION_URL } from '@ss/payroll/api-person';

// frontend only
interface Person extends IPerson {
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
    public person: Person;
    public lastLine: EmployeeActivation;
    public imageModel: ImageModel;
    public employmentTypes: { [id: number]: string; };
    public suspensionReasons: { [id: number]: string; };

    constructor(
        public employeeActivationSrv: EmployeeActivationService,
        public uiSrv: EmployeeActivationUIService,
        public personSrv: PersonService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public lookupsSrv: LookupsService,
        public langSrv: LanguageService,
        public confirmationSrv: ConfirmationDialogService,
        public httpSrv: HttpService) {
        super(employeeActivationSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'PAYROLL_EMPLOYEE_ACTIVATION_SUSPENSION');
        this.imageModel = new ImageModel(httpSrv);
        this.imageModel.readOnly = true;
        this.pagination.pageSize = 50; // todo: make this unlimited in backend
    }

    ngOnInit() {
        this.uiSrv.instance = this;
        this.route.params.subscribe(params => {
            this.personId = +params.id;
            this.imageModel.setImageUrl(this.personSrv.getPhotoUrl(this.personId));
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
        return this.personSrv.get(this.personId)
            .pipe(
                tap(p => {
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
            (total, currentValue) => {
                total[currentValue.id] = currentValue.description;
                return total
            }, {}
        );
    }

    onSuspensionReasonLoaded(data: SuspensionReason[]): void {
        this.suspensionReasons = data.reduce(
            (total, currentValue) => {
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
            this.router.navigate([ACTIVATION_URL], { relativeTo: this.route })
                .then();
        });
    }

    public deactivateEmployee(id: number = 0) {
        this.refresh(() => {
            this.router.navigate([DEACTIVATION_URL], { relativeTo: this.route })
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
