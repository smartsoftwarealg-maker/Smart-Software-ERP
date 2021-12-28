import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Company, CompanyService} from "@ss/administration/api-company";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';

@Component({
    selector: 'ss-company-list',
    styleUrls: ['./company-list.component.scss'],
    templateUrl: './company-list.component.html'
})
export class CompanyListComponent extends BaseEntityListComponent<Company> {


    displayedColumns = [
        'description',
        'company2',
        'address'
    ];


    constructor(
        public companySrv: CompanyService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(companySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'ADMINISTRATION_COMPANY');
    }


}
