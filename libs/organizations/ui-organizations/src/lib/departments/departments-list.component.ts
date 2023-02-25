import { Component, } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LanguageService, PaginatorPersistenceService, User, UserService } from '@ss/common/api-common';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { AgentService } from '@ss/logistics/api-agent';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { DepartmentService, Department } from '@ss/common/api-lookup';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { EmployeeService } from '@ss/payroll/api-employee';


@Component({
    selector: 'ss-departments-list',
    templateUrl: './departments-list.component.html',
    styleUrls: ['./departments-list.component.scss'],
})
export class DepartmentsListComponent extends BaseEntityListComponent<Department> {

    displayedColumns = [
        'description',
        'responsible'
    ];

    constructor(
        public departmentsSrv: DepartmentService,
        public employeeSrv: EmployeeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public userSrv: UserService,
        public langSrv: LanguageService,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(departmentsSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_DEPARTMENTS');
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('..', this.route);
    }

    public override processLoadedData(data: Department[]): Observable<Department[]> {
        data.forEach(d =>
            d.responsible
                ? this.employeeSrv.get(d.responsible).subscribe(p => d.responsibleName = this.langSrv.formatFullName(p.firstName, p.lastName))
                : of(null)
        );
        return of(data);
    }
}
