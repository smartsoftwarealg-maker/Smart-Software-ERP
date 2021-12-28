import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {CCGroup, Currency, CurrencyService, LookupsService} from '@ss/common/api-lookup';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {PaginatorPersistenceService} from '@ss/common/api-common';

@Component({
    selector: 'ss-cost-center-list',
    styleUrls: ['./currency-list.component.scss'],
    templateUrl: './currency-list.component.html'
})
export class CurrencyListComponent extends BaseEntityListComponent<Currency> {

    displayedColumns = [
        'code',
        'description',
        'exchangeRate'
    ];

    constructor(
        public currencySrv: CurrencyService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public lookupSrv: LookupsService,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService,
        public pagPersist: PaginatorPersistenceService) {
        super(currencySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersist, 'LOGISTICS_CURRENCIES');
        this.pagination.pageSize = 20;
    }

    ngOnInit() {
        super.ngOnInit();
        this.currencySrv.load().subscribe();
    }
}
