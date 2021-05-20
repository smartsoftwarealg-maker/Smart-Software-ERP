import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {CurrencyService, LookupsService} from '@ss/common/api-lookup';
import {CurrencyDepositService, DepositTypeService, Deposit} from '@ss/exchange/api-currency-deposit';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {AgentService} from '@ss/logistics/api-agent';

@Component({
    selector: 'ss-deposit-list',
    styleUrls: ['./deposit-list.component.scss',
                '../../../../common/assets/src/assets/main-container.scss'],
    templateUrl: './deposit-list.component.html'
})
export class DepositListComponent extends BaseEntityListComponent<Deposit> {

    agents = new Map<number, string>();
    selectedAgent = 0;

    displayedColumns = [
        'customerCode',
        'denomination',
        'excDate',
        'type',
        'credit',
        'debit',
        'currency'
    ];

    constructor(
        private depositTypeSrv: DepositTypeService,
        private currencySrv: CurrencyService,
        public exchangeSrv: CurrencyDepositService,
        public agentService: AgentService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService) {
        super(exchangeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'EXCHANGE_CURRENCY_DEPOSIT');
    }

    processLoadedData(data: Deposit[]): Observable<Deposit[]> {
        return this.currencySrv
            .load()
            .pipe(switchMap(_ => this.agentService.getByIDList(data.map(x => x.customerId))),
                switchMap(res => {
                      data.forEach(d => {
                          const agent = res.find(e => e.id == d.customerId);
                          d.denomination = agent?.denomination;
                          d.customerCode = agent?.customerCode;
                          d.currencyDescription = this.currencySrv.currencyList.find(e => e.id === d.currencyId)?.description;
                      });
                      return this.depositTypeSrv.getList(0, 50);
                  }),
                switchMap(res => {
                    data.forEach(d => d.typeDescription = res.body.find(e => e.id === d.depositType)?.description);
                    return super.processLoadedData(data);
                }));
    }

    selectRow(e: Deposit) {
        this.selectedAgent = e? e.customerId || 0 : 0;
        super.select(e? e.id || 0 : 0)
    }
}
