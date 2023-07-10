import { Component, } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LanguageService, PaginatorPersistenceService, User, UserService } from '@ss/common/api-common';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { AgentService } from '@ss/logistics/api-agent';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { DivisionService, Division } from '@ss/common/api-lookup';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { EmployeeService } from '@ss/employee-services/employee-services';


@Component({
    selector: 'ss-divisions-list',
    templateUrl: './divisions-list.component.html',
    styleUrls: ['./divisions-list.component.scss'],
})
export class DivisionsListComponent extends BaseEntityListComponent<Division> {

    displayedColumns = [
        'description',
        'responsible'
    ];

    constructor(
        public divisionsSrv: DivisionService,
        public employeeSrv: EmployeeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public userSrv: UserService,
        public agentSrv: AgentService,
        public langSrv: LanguageService,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(divisionsSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_DIVISIONS');
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('..', this.route);
    }

    public override processLoadedData(data: Division[]): Observable<Division[]> {
        data.forEach(d =>
            d.responsible
                ? this.employeeSrv.get(d.responsible).subscribe(p => d.responsibleName = this.langSrv.formatFullName(p.firstName, p.lastName))
                : of(null)
        );
        return of(data);
    }
}
