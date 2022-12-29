import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {CurrencyService, LookupsService} from '@ss/common/api-lookup';
import {
    CurrencyDepositService,
    DepositTypeService,
    Deposit,
    CurrencyCommissionService
} from '@ss/exchange/api-currency-deposit';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {AgentService} from '@ss/logistics/api-agent';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';

@Component({
    selector: 'ss-commission-list',
    styleUrls: ['./cash-commission-list.component.scss',
                '../../../../../common/assets/src/assets/main-container.scss'],
    templateUrl: './cash-commission-list.component.html'
})
export class CashCommissionListComponent extends BaseEntityListComponent<Deposit> {

    agents = new Map<number, string>();
    selectedAgent = 0;

    displayedColumns = [
        'denomination',
        'customerCode',
        'excDate',
        'type',
        'commission',
        'currency'
    ];

    constructor(
        private depositTypeSrv: DepositTypeService,
        private currencySrv: CurrencyService,
        public commissionSrv: CurrencyCommissionService,
        public agentService: AgentService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(commissionSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'EXCHANGE_COMMISSIONS');
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
