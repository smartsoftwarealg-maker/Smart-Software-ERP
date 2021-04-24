import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {CurrencyExchangeService, DepositTypeService, Exchange} from '@ss/exchange/api-currency-exchange';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {AgentService} from '@ss/logistics/api-agent';

@Component({
    selector: 'ss-cost-center-list',
    styleUrls: ['./exchange-list.component.scss',
                '../../../../common/assets/src/assets/main-container.scss'],
    templateUrl: './exchange-list.component.html'
})
export class ExchangeListComponent extends BaseEntityListComponent<Exchange> {

    agents = new Map<number, string>();

    displayedColumns = [
        'excDate',
        'denomination',
        'type',
        'debit',
        'credit'
    ];

    constructor(
        private depositTypeSrv: DepositTypeService,
        public exchangeSrv: CurrencyExchangeService,
        public agentService: AgentService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public lookupSrv: LookupsService,
        public confirmationSrv: ConfirmationDialogService) {
        super(exchangeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'EXCHANGE_CURRENCY_EXCHANGE');
    }


    processLoadedData(data: Exchange[]): Observable<Exchange[]> {
        return this.agentService
            .getByIDList(data.map(x => x.customerId))
            .pipe(switchMap(res => {
                      data.forEach(d => d.denomination = res.find(e => e.id == d.customerId)?.denomination);
                      return this.depositTypeSrv.getList(0, 50);
                  }),
                switchMap(res => {
                    console.log('data', data);
                    data.forEach(d => d.typeDescription = res.body.find(e => e.id === d.depositType)?.description);
                    return super.processLoadedData(data);
                }));
    }
}
