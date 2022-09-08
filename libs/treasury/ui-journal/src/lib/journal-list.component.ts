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

@Component({
    selector: 'ss-journal-list',
    styleUrls: ['./journal-list.component.scss'],
    templateUrl: './journal-list.component.html'
})
export class JournalListComponent extends BaseEntityListComponent<Journal> implements OnInit {

    displayedColumns = [
        'description',
        'jType',
        'bankId',
        'bankAccount',
        'typeName'
    ];

    constructor(
        public journalSrv: JournalService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(journalSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'TRS_CHECKS');
    }

//    public processLoadedData(data: Journal[]): Observable<Journal[]> {
//        data.forEach(c => {
//            //c.date = removeTimeForDateStr(ymdToDmy(c.date));
//        });
//        return of(data);
//    }

    ngOnInit() {
        super.ngOnInit();
    }
}
