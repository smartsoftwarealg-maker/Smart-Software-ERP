import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LanguageService, PaginatorPersistenceService, User, UserService} from '@ss/common/api-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {AgentService} from '@ss/logistics/api-agent';
import { Department as IDepartment, DepartmentService, DivisionService } from '@ss/organizations/api-organizations';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Observable, of, forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { EmployeeService } from '@ss/payroll/api-employee';

interface Department extends IDepartment {
    responsibleName?: string;
}

@Component({
    selector: 'ss-departments-list',
    templateUrl: './departments-list.component.html',
    styleUrls: ['./departments-list.component.scss'],
})
export class DepartmentsListComponent extends BaseEntityListComponent<Department> {

    displayedColumns = [
        'description',
        'division',
        'responsible'
    ];
    divisions: { [key: number]: string} = {};

    constructor(
        public departmentsSrv: DepartmentService,
        public divisionSrv: DivisionService,
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
        super(departmentsSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_DEPARTMENTS');
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('..', this.route);
    }

    public processLoadedData(data: Department[]): Observable<Department[]> {
        this.divisions = {};
        return forkJoin(
                data.map(d =>
                    d.responsible
                        ? this.employeeSrv.get(d.responsible)
                            .pipe(tap(p => d.responsibleName = this.langSrv.formatFullName(p.firstName, p.lastName)))
                        : of(null)
                )
        ).pipe(
            switchMap(() => this.divisionSrv.getList(0, 49)),
            tap(divs => divs.body.forEach(e => this.divisions[e.id] = e.description)),
            switchMap(() => of(data))
        );
    }

}
