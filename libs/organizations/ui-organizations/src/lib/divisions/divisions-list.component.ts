import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LanguageService, PaginatorPersistenceService, User, UserService} from '@ss/common/api-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {AgentService} from '@ss/logistics/api-agent';
import { DIVISIONS_URL, Division as IDivision, Service, Department, DEPARTMENTS_URL, SERVICES_URL, Office, OFFICES_URL, Lookup, DivisionService } from '@ss/organizations/api-organizations';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';

interface Division extends IDivision {
    responsibleName?: string;
}

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
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public userSrv: UserService,
        public agentSrv: AgentService,
        public langServ: LanguageService,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(divisionsSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_DIVISIONS');
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('..', this.route);
    }

}
