import { Component, OnInit } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService, ToolbarButton, KeepOnToolbar, ToolbarLabel } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee as IEmployee, EmployeeService } from '@ss/payroll/api-employee';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { LookupsService } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ImageModel } from '@ss/common/ui-image-input';
import { HttpService, LanguageService, PaginatorPersistenceService } from '@ss/common/api-common';
import { ACTIVATION_LIST_ROUTE_URL, CAREER_ROUTE_URL, CONTRACTS_ROUTE_URL, WIVES_ROUTE_URL } from '@ss/payroll/api-employee';
import { DefaultReportService } from '@ss/common/ui-default-report-component';

interface Lookup {
    id: number;
    description: string;
}

// frontend only
interface Employee extends IEmployee {
    fullName: string;
    imageModel: ImageModel;
}

@Component({
    selector: 'ss-employee-list',
    styleUrls: ['./employee-list.component.scss'],
    templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent extends BaseEntityListComponent<IEmployee> implements OnInit {

    public displayedColumns = [
        'photo',
        'id',
        'fullname',
        'birth',
        'address',
        'maritalStatus'
    ];

    gotoActivationButton: ToolbarButton = {
        disabled: true,
        visible: true,
        icon: 'fas fa-play',
        keepOnToolbar: KeepOnToolbar.NEVER,
        label: 'PAYROLL_EMP_ACTIVATION_SUSPENSION',
        click: () => this.shellSrv.navigateByRelativeUrl(ACTIVATION_LIST_ROUTE_URL + '/' + this.selected)
    };

    gotoCareerButton: ToolbarButton = {
        disabled: true,
        visible: true,
        icon: 'far fa-id-card-alt',
        keepOnToolbar: KeepOnToolbar.NEVER,
        label: 'PAYROLL_EMPLOYEE_CAREER_OVERVIEW',
        click: () => this.shellSrv.navigateByRelativeUrl(CAREER_ROUTE_URL + '/' + this.selected)
    }

    gotoContractsButton: ToolbarButton = {
        disabled: true,
        visible: true,
        icon: 'fa-solid fa-file-signature',
        keepOnToolbar: KeepOnToolbar.NEVER,
        label: 'PAYROLL_CONTRACTS',
        click: () => this.shellSrv.navigateByRelativeUrl(CONTRACTS_ROUTE_URL + '/' + this.selected)
    }

    gotoWivesButton: ToolbarButton = {
        disabled: true,
        visible: true,
        icon: 'fa-solid fa-rings-wedding',
        keepOnToolbar: KeepOnToolbar.NEVER,
        label: 'PAYROLL_WIVES',
        click: () => this.shellSrv.navigateByRelativeUrl(WIVES_ROUTE_URL + '/' + this.selected)
    }

    maritalStatus: { [id: number]: string; };
    nationalities: { [id: number]: string; };
    militaryServiceStates: { [id: number]: string; };

    constructor(
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
        super(employeeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'PAYROLL_EMPLOYEES_LIST');
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.route.data.subscribe(data => {
            if (data?.payrollButtons) {
                this.shellSrv.addButton(this.gotoActivationButton);
                this.shellSrv.addButton(this.gotoCareerButton);
                this.shellSrv.addButton(this.gotoContractsButton);
                this.shellSrv.addButton(this.gotoWivesButton);
            }
        })

    }

    public select(id: number): void {
        const disableControls = id == null || id < 1;
        this.gotoActivationButton.disabled = disableControls;
        this.gotoCareerButton.disabled = disableControls;
        this.gotoWivesButton.disabled = disableControls;
        this.gotoContractsButton.disabled = disableControls;
        super.select(id);
    }

    preload(): Observable<any> {
        return this.lookupsSrv.getMaritalStatuses()
            .pipe(
                tap(x => {
                    this.maritalStatus = this.onLookupLoaded(x);
                }),

                switchMap(() => this.lookupsSrv.getNationalities()),
                tap(x => {
                    this.nationalities = this.onLookupLoaded(x);
                }),

                switchMap(() => this.lookupsSrv.getMilitaryServiceStates()),
                tap(x => {
                    this.militaryServiceStates = this.onLookupLoaded(x);
                })
            );
    }

    onLookupLoaded(data: Lookup[]): { [id: number]: string; } {
        const map: { [id: number]: string; } = {};
        data.forEach(m => map[m.id] = m.description);
        return map;
    }

    public processLoadedData(data: Employee[]): Observable<Employee[]> {
        return of(data.map(p => {
            // note: formatting the date here means it will not change when the language
            // is changed until the page is refreshed
            p.birthDate = this.langSrv.formatDate(p.birthDate);
            p.fullName = this.langSrv.formatFullName(p.firstName, p.lastName);
            p.imageModel = new ImageModel(this.httpSrv);
            p.imageModel.readOnly = true;
            p.imageModel.setImageUrl(this.employeeSrv.getPhotoUrl(p.id), false);
            return p;
        }));
    }

    public releaseResources(): void {
    }

}
