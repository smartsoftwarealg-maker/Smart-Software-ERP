import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {CurrencyService, LookupsService} from '@ss/common/api-lookup';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AgentService} from '@ss/logistics/api-agent';
import {CurrencyExchangeService, Exchange} from '@ss/exchange/api-currency-exchange';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DecimalPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'ss-exchange-list',
    styleUrls: ['./exchange-list.component.scss',
        '../../../../common/assets/src/assets/main-container.scss'],
    templateUrl: './exchange-list.component.html',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, DecimalPipe, DatePipe]
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
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        private currencySrv: CurrencyService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(exchangeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'EXCHANGE_CURRENCY_EXCHANGE');
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

    ngOnInit() {
        super.ngOnInit();
        this.currencySrv.load().subscribe();
    }
}
