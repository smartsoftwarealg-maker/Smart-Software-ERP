import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { HttpService, LanguageService, PaginatorPersistenceService } from '@ss/common/api-common';
import { LookupsService } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ImageModel } from '@ss/common/ui-image-input';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { EmployeeService, Employee as IEmployee, Wife, EmployeeWivesService } from '@ss/payroll/api-employee';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { EmployeeWivesListUIService } from './employee-wives-lists-ui.service';
import { DefaultReportService } from '@ss/common/ui-default-report-component';

// frontend only
interface Employee extends IEmployee {
    fullName?: string;
}

interface Lookup {
    id: number;
    description: string;
}

@Component({
    selector: 'ss-emp-wives-overview',
    templateUrl: './empolyee-wives-overview.component.html',
    styleUrls: ['./empolyee-wives-overview.component.scss'],
    providers: [EmployeeWivesListUIService]
})
export class EmployeeWivesOverviewComponent extends BaseEntityListComponent<Wife> implements OnInit {

    public personId: number;
    public person: Employee;
    public imageModel: ImageModel;
    //
    posts: { [id: number]: string; };
    divisions: { [id: number]: string; };
    departments: { [id: number]: string; };
    services: { [id: number]: string; };

    constructor(
        public empWivesSrv: EmployeeWivesService,
        public uiSrv: EmployeeWivesListUIService,
        public employeeSrv: EmployeeService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public lookupsSrv: LookupsService,
        public langSrv: LanguageService,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public pagPersistSrv: PaginatorPersistenceService,
        public httpSrv: HttpService) {
        super(empWivesSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'PAYROLL_EMPLOYEE_WIVES_OVERVIEW');
        this.imageModel = new ImageModel(httpSrv);
        this.imageModel.readOnly = true;
        this.pagination.pageSize = 50; // todo: make this unlimited in backend
        uiSrv.instance = this;
    }

    ngOnInit() {
        this.showListControls(false); // called to avoid 'called enableSearch twice' error
        this.route.params.subscribe(params => {
            this.personId = +params.id;
            this.imageModel.setImageUrl(this.employeeSrv.getPhotoUrl(this.personId));
            this.empWivesSrv.setParentId(this.personId);
            super.ngOnInit();
            this.initView();
        });
    }

    private initView() {
        this.shellSrv.setGoBackPathByRelativeUrl('..');
        this.shellSrv.disableSearch();
    }

    public preload(): Observable<any> {
        if (!this.personId) {
            return of(null);
        }
        this.empWivesSrv.setParentId(this.personId);
        return this.employeeSrv.get(this.personId)
            .pipe(
                tap((p: Employee) => {
                    this.person = p;
                    this.person.birthDate = this.langSrv.formatDate(p.birthDate);
                    this.person.fullName = this.langSrv.formatFullName(p.firstName, p.lastName);
                }),
                switchMap(() => this.lookupsSrv.getPosts()),
                tap(posts => this.posts = this.lookupListToMap(posts)),
                switchMap(() => this.lookupsSrv.getDepartments()),
                tap(list => this.departments = this.lookupListToMap(list)),
                switchMap(() => this.lookupsSrv.getDivisions()),
                tap(list => this.divisions = this.lookupListToMap(list)),
                switchMap(() => this.lookupsSrv.getServices()),
                tap(list => this.services = this.lookupListToMap(list))
            );
    }

    processLoadedWife(c: Wife): Wife {
        if (c) {
            c.valid_date = this.langSrv.formatDate(c.valid_date);
            c.fromdate = this.langSrv.formatDate(c.fromdate);
            c.todate = this.langSrv.formatDate(c.todate);
            c.date = this.langSrv.formatDate(c.date);
        }
        return c;
    }

    lookupListToMap(data: Lookup[]): { [id: number]: string; } {
        const map: { [id: number]: string; } = {};
        data.forEach(m => map[m.id] = m.description);
        return map;
    }

    public processLoadedData(data: Wife[]): Observable<Wife[]> {
        return of(data.map(c => this.processLoadedWife(c)));
    }

    public enableSearch(): void {
        if (!this.shellSrv.hasSearch) {
            super.enableSearch();
        }
    }

    public showListControls(visible: boolean): void {
        this.refreshButton.visible = visible;
        this.deleteButton.visible = visible;
        this.editButton.visible = visible;
        this.addButton.visible = visible;
        if (visible) {
            this.enableSearch();
        } else {
            this.shellSrv.disableSearch();
        }
        this.shellSrv.updateShell();
    }
}
