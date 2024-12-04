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
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '../../../../../common/ui-pagination/src/lib/pagination.component';
import { AsyncPipe } from '@angular/common';
import { BankDescriptionPipe } from '@ss/administration/api-bank';

@Component({
    selector: 'ss-check-book-list',
    styleUrls: ['./check-book-list.component.scss'],
    templateUrl: './check-book-list.component.html',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, AsyncPipe, BankDescriptionPipe]
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

}
