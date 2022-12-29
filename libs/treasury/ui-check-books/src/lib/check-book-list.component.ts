import { Component, OnInit, } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckBookService, CheckBook } from '@ss/treasury/api-check-books';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { LookupsService } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { HttpService, PaginatorPersistenceService, ymdToDmy, removeTimeForDateStr } from '@ss/common/api-common';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'ss-check-book-list',
    styleUrls: ['./check-book-list.component.scss'],
    templateUrl: './check-book-list.component.html'
})
export class CheckBookListComponent extends BaseEntityListComponent<CheckBook> implements OnInit {

    displayedColumns = [
        'bank',
        'bookYear',
        'fromNumber',
        'toNumber'
    ];

    constructor(
        public checkBookSrv: CheckBookService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(checkBookSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'TRS_CHECKBOOKS');
    }

    override ngOnInit() {
        super.ngOnInit();
    }
}
