import { Component, OnInit, } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { LookupsService } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { HttpService, PaginatorPersistenceService} from '@ss/common/api-common';
//import { Observable, of } from 'rxjs';
import { Journal, JournalService } from '@ss/treasury/api-journal';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '../../../../../common/ui-pagination/src/lib/pagination.component';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ss/common/ui-lang';
import { LookupDescriptionPipe } from '../../../../../common/api-lookup/src/lib/lookup-description.pipe';

@Component({
    selector: 'ss-journal-list',
    styleUrls: ['./journal-list.component.scss'],
    templateUrl: './journal-list.component.html',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, AsyncPipe, TranslatePipe, LookupDescriptionPipe]
})
export class JournalListComponent extends BaseEntityListComponent<Journal> implements OnInit {

    displayedColumns = [
        'description',
        'jType',
        'bankId',
        'bankAccount'
    ];

    constructor(
        public journalSrv: JournalService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(journalSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_JOURNALS');
        this.pagination.pageSize = 15;
    }

//    public processLoadedData(data: Journal[]): Observable<Journal[]> {
//        data.forEach(c => {
//            //c.date = removeTimeForDateStr(ymdToDmy(c.date));
//        });
//        return of(data);
//    }

}
