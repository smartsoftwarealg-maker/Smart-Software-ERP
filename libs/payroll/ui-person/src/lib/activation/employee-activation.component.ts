import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/api-base-entity';
import { HttpService, Person as IPerson } from '@ss/common/api-common';
import { LookupsService } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ImageModel } from '@ss/common/ui-image-input';
import { LanguageService } from '@ss/common/ui-lang';
import { ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { EmployeeActivation, EmployeeActivationService, PersonService } from '@ss/payroll/api-person';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

// frontend only
interface Person extends IPerson {
    fullName: string;
}

@Component({
    selector: 'ss-employee-activation',
    templateUrl: './employee-activation.component.html',
    styleUrls: ['./employee-activation.component.scss']
})
export class EmployeeActivationComponent extends BaseEntityListComponent<EmployeeActivation> implements OnInit {

    activateButton: ToolbarButton = {
        disabled: false,
        keepOnToolbar: false,
        label: 'PAYROLL_ACTIVATE_EMP',
        icon: 'fas fa-play',
        visible: true,
        click: () => this.activateEmployee(),
    };

    deactivateButton: ToolbarButton = {
        disabled: false,
        keepOnToolbar: false,
        label: 'PAYROLL_DEACTIVATE_EMP',
        icon: 'fas fa-pause',
        visible: true,
        click: () => this.deactivateEmployee(),
    };

    public displayedColumns = [
        'hireDate',
        'employmentType',
        'suspended',
        'suspensionDate',
        'inConflict'
    ];

    personId: number;
    person: Person;
    imageModel: ImageModel;

    constructor(
        public employeeActivationSrv: EmployeeActivationService,
        public personSrv: PersonService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public lookupsSrv: LookupsService,
        public langSrv: LanguageService,
        public confirmationSrv: ConfirmationDialogService,
        public httpSrv: HttpService) {
        super(employeeActivationSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'PAYROLL_EMPLOYEES_ACTIVATION');
        this.imageModel = new ImageModel(httpSrv);
        this.imageModel.readOnly = true;
    }

    ngOnInit() {
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
        this.shellSrv.setButtonVisible(this.editButton, false);
        this.shellSrv.setButtonEnabled(this.editButton, false);
        this.shellSrv.disableSearch();
        this.shellSrv.setButtons([this.activateButton, this.deactivateButton]);
    }

    public preload(): Observable<any> {
        return this.personSrv.get(this.personId)
            .pipe(tap(p => {
                this.person = p;
                this.person.birthDate = this.langSrv.formatDate(p.birthDate);
                this.person.fullName = this.langSrv.formatFullName(p.firstName, p.lastName);
            }));
    }

    public processLoadedData(data: EmployeeActivation[]): Observable<EmployeeActivation[]> {
        const active = data.length > 0 && data[0].activityStatus == 0;
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

    public activateEmployee() {

    }

    public deactivateEmployee() {
    }

}
