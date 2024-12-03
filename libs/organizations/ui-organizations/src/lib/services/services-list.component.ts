import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LanguageService, PaginatorPersistenceService, User, UserService} from '@ss/common/api-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {AgentService} from '@ss/logistics/api-agent';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { EmployeeService } from '@ss/employee-services/employee-services';
import { ServiceService, Service } from '@ss/common/api-lookup';
import { Observable, of } from 'rxjs';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '../../../../../common/ui-pagination/src/lib/pagination.component';

@Component({
    selector: 'ss-services-list',
    templateUrl: './services-list.component.html',
    styleUrls: ['../divisions/divisions-list.component.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
    ],
})
export class ServicesListComponent extends BaseEntityListComponent<Service> {

    displayedColumns = [
        'description',
        'responsible'
    ];
    departments: { [key: number]: string} = {};

    constructor(
        public serviceSrv: ServiceService,
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
        super(serviceSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_SERVICES');
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('..', this.route);
    }

    public override processLoadedData(data: Service[]): Observable<Service[]> {
        data.forEach(d =>
            d.responsible
                ? this.employeeSrv.get(d.responsible).subscribe(p => d.responsibleName = this.langSrv.formatFullName(p.firstName, p.lastName))
                : of(null)
        );
        return of(data);
    }
}
