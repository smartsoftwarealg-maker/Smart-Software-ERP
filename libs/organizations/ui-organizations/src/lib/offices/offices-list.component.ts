import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LanguageService, PaginatorPersistenceService, User, UserService} from '@ss/common/api-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {AgentService} from '@ss/logistics/api-agent';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { EmployeeService } from '@ss/payroll/api-employee';
import { OfficeService, Office } from '@ss/common/api-lookup';

@Component({
    selector: 'ss-offices-list',
    templateUrl: './offices-list.component.html',
    styleUrls: ['./offices-list.component.scss'],
})
export class OfficesListComponent extends BaseEntityListComponent<Office> {

    displayedColumns = [
        'code',
        'description',
        'locationDescription',
        'floorNo'
    ];

    constructor(
        public officeSrv: OfficeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(officeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_OFFICES');
    }

    override ngOnInit(): void {
        this.shellSrv.setGoBackPath('..', this.route);
        super.ngOnInit();
    }
}
