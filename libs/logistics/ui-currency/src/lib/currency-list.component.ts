import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {CostCenter, CostCenterService} from '@ss/logistics/api-cost-center';
import {Observable} from 'rxjs';
import {CCGroup, Currency, CurrencyService, LookupsService} from '@ss/common/api-lookup';
import {tap} from 'rxjs/operators';

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
        public confirmationSrv: ConfirmationDialogService) {
        super(currencySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'LOGISTICS_CURRENCIES');
        this.pagination.pageSize = 20;
    }
}
