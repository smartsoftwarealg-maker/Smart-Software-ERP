import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Bank, BankService} from "@ss/administration/api-bank";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';

@Component({
    selector: 'ss-bank-list',
    styleUrls: ['./bank-list.component.scss'],
    templateUrl: './bank-list.component.html'
})
export class BankListComponent extends BaseEntityListComponent<Bank> {

    displayedColumns = [
        'description',
        'code'
    ];


    constructor(
        public bankSrv: BankService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(bankSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'ADMINISTRATION_BANK');
    }


}
