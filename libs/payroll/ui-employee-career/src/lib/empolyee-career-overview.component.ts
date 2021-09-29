import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { HttpService, LanguageService } from '@ss/common/api-common';
import { LookupsService, EmploymentType, SuspensionReason } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ImageModel } from '@ss/common/ui-image-input';
import { ShellService, SnackBarService, ToolbarButton, KeepOnToolbar } from '@ss/common/ui-shell';
import { EmployeeService, Employee as IEmployee, Career, EmployeeCareerService } from '@ss/payroll/api-employee';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { EmployeeCareerUIService } from './employee-career-ui.service';
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
    selector: 'ss-emp-career-overview',
    templateUrl: './empolyee-career-overview.component.html',
    styleUrls: ['./empolyee-career-overview.component.scss'],
    providers: [EmployeeCareerUIService]
})
export class EmployeeCareerOverviewComponent extends BaseEntityListComponent<Career> implements OnInit {

    public personId: number;
    public person: Employee;
    public lastLine: Career;
    public imageModel: ImageModel;
    //
    posts: { [id: number]: string; };
    divisions: { [id: number]: string; };
    departments: { [id: number]: string; };
    services: { [id: number]: string; };

    constructor(
        public empCareerSrv: EmployeeCareerService,
        public uiSrv: EmployeeCareerUIService,
        public employeeSrv: EmployeeService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public lookupsSrv: LookupsService,
        public langSrv: LanguageService,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public httpSrv: HttpService) {
        super(empCareerSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'PAYROLL_EMPLOYEE_CAREER_OVERVIEW');
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
            this.empCareerSrv.setParentId(this.personId);
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
        this.empCareerSrv.setParentId(this.personId);
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
                tap(list => this.services = this.lookupListToMap(list)),
                switchMap(() => this.empCareerSrv.getLast()),
                tap((last: Career) => {
                    this.lastLine = this.processLoadedCareer(last);
                })
            );
    }

    processLoadedCareer(c: Career): Career {
        if (c) {
            c.from_date = this.langSrv.formatDate(c.from_date);
            c.to_date = this.langSrv.formatDate(c.to_date);
        }
        return c;
    }

    lookupListToMap(data: Lookup[]): { [id: number]: string; } {
        const map: { [id: number]: string; } = {};
        data.forEach(m => map[m.id] = m.description);
        return map;
    }

    public processLoadedData(data: Career[]): Observable<Career[]> {
        return of(data.map(c => this.processLoadedCareer(c)));
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
