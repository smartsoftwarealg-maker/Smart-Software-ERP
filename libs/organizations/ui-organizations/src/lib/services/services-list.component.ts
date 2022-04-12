import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LanguageService, PaginatorPersistenceService, User, UserService} from '@ss/common/api-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {AgentService} from '@ss/logistics/api-agent';
import { Service as IService, ServiceService, DepartmentService } from '@ss/organizations/api-organizations';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Observable, of, forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { EmployeeService } from '@ss/payroll/api-employee';

interface Service extends IService {
    responsibleName?: string;
}

@Component({
    selector: 'ss-services-list',
    templateUrl: './services-list.component.html',
    styleUrls: ['./services-list.component.scss'],
})
export class ServicesListComponent extends BaseEntityListComponent<Service> {

    displayedColumns = [
        'description',
        'department',
        'responsible'
    ];
    departments: { [key: number]: string} = {};

    constructor(
        public departmentsSrv: DepartmentService,
        public serviceSrv: ServiceService,
        public employeeSrv: EmployeeService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public userSrv: UserService,
        public agentSrv: AgentService,
        public langSrv: LanguageService,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(serviceSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_SERVICES');
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('..', this.route);
    }

    public preload(): Observable<any> {
        this.serviceSrv.setParentId(0);
        this.departmentsSrv.setParentId(0);
        return of(null);
    }

    public processLoadedData(data: Service[]): Observable<Service[]> {
        this.departments = {};
        return forkJoin(
                data.map(d =>
                    d.responsible
                        ? this.employeeSrv.get(d.responsible)
                            .pipe(tap(p => d.responsibleName = this.langSrv.formatFullName(p.firstName, p.lastName)))
                        : of(null)
                )
        ).pipe(
            switchMap(() => this.departmentsSrv.getList(0, 49)),
            tap(divs => divs.body.forEach(e => this.departments[e.id] = e.description)),
            switchMap(() => of(data))
        );
    }

}
