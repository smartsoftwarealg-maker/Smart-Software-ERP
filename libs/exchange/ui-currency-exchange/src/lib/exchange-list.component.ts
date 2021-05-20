import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {CurrencyService, LookupsService} from '@ss/common/api-lookup';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {AgentService} from '@ss/logistics/api-agent';
import {CurrencyExchangeService, Exchange} from '@ss/exchange/api-currency-exchange';

@Component({
    selector: 'ss-exchange-list',
    styleUrls: ['./exchange-list.component.scss',
                '../../../../common/assets/src/assets/main-container.scss'],
    templateUrl: './exchange-list.component.html'
})
export class ExchangeListComponent extends BaseEntityListComponent<Exchange> {

    agents = new Map<number, string>();
    selectedAgent = 0;

    displayedColumns = [
        'exchDate',
        'agentId',
        'purchCurrency',
        'amount',
        'soldCurrency',
        'exchRate',
        'soldAmount',
        'memo'
    ];

    constructor(
        public exchangeSrv: CurrencyExchangeService,
        public agentService: AgentService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public lookupSrv: LookupsService,
        public confirmationSrv: ConfirmationDialogService,
        private currencySrv: CurrencyService) {
        super(exchangeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'EXCHANGE_CURRENCY_EXCHANGE');
    }


    processLoadedData(data: Exchange[]): Observable<Exchange[]> {
        return this.currencySrv
            .load()
            .pipe(switchMap(_ => this.agentService.getByIDList(data.map(x => x.agentId))),
                  switchMap(res => {
                      data.forEach(d => {
                          d.denomination = res.find(e => e.id == d.agentId)?.denomination;
                          d.purchCurrDescrip = this.currencySrv.currencyList.find(e => e.id === d.purchCurrency)?.description;
                          d.soldCurrDescrip = this.currencySrv.currencyList.find(e => e.id === d.soldCurrency)?.description;
                      });
                    return super.processLoadedData(data);
                  }));
    }

    selectRow(e: Exchange) {
        this.selectedAgent = e? e.agentId || 0 : 0;
        super.select(e? e.id || 0 : 0)
    }
}
