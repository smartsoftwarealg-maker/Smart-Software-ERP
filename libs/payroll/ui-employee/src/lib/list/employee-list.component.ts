import { Component, OnInit } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeService } from '@ss/payroll/api-employee';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { LookupsService } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ImageModel } from '@ss/common/ui-image-input';
import { HttpService, LanguageService, PaginatorPersistenceService } from '@ss/common/api-common';
import { DefaultReportService } from '@ss/common/ui-default-report-component';

interface Lookup {
    id: number;
    description: string;
}

@Component({
    selector: 'ss-employee-list',
    styleUrls: ['./employee-list.component.scss'],
    templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent extends BaseEntityListComponent<Employee> implements OnInit {
    activePersonnel = true;
    public displayedColumns = [
        'id',
        'fullname',
        'birth',
        'address',
        'maritalStatus',
        'post'
    ];

    maritalStatus: { [id: number]: string; };
    nationalities: { [id: number]: string; };
    militaryServiceStates: { [id: number]: string; };

    constructor(
        public employeeSrv: EmployeeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public lookupsSrv: LookupsService,
        public langSrv: LanguageService,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public httpSrv: HttpService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(employeeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'PAYROLL_EMPLOYEES_LIST');
        this.pagination.pageSize = 15;
        this.route.data.subscribe(data => {
            this.activePersonnel = !!data['active']
            this.employeeSrv.setMode(this.activePersonnel);
        });
    }

    trackByFn(index: number, item: Employee) {
        return item.id;
    }

    override ngOnInit(): void {
        this.addButton.visible = this.activePersonnel;
        super.ngOnInit();
        this.shellSrv.setGoBackPath('..', this.route);
    }

    public override select(id: number): void {
        const disableControls = id == null || id < 1;
        super.select(id);
    }

    override preload(): Observable<any> {
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

    public override processLoadedData(data: Employee[]): Observable<Employee[]> {
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
}
