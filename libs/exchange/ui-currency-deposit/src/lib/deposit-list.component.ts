import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {CurrencyService, LookupsService} from '@ss/common/api-lookup';
import {CurrencyDepositService, DepositTypeService, Deposit} from '@ss/exchange/api-currency-deposit';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {AgentService} from '@ss/logistics/api-agent';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {LoginService, PaginatorPersistenceService} from "@ss/common/api-common";
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatCheckbox } from '@angular/material/checkbox';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { ExcDocInfoComponent } from '@ss/exchange/ui-info';
import { DecimalPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'ss-deposit-list',
    styleUrls: ['./deposit-list.component.scss',
        '../../../../common/assets/src/assets/main-container.scss'],
    templateUrl: './deposit-list.component.html',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatCheckbox, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, ExcDocInfoComponent, DecimalPipe, DatePipe]
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
        'currency',
        'withdrawn'
    ];

    constructor(
        private loginSrv: LoginService,
        private depositTypeSrv: DepositTypeService,
        private currencySrv: CurrencyService,
        public exchangeSrv: CurrencyDepositService,
        public agentService: AgentService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(exchangeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'EXCHANGE_CURRENCY_DEPOSIT');
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
        super.selectRow(e);
        this.selectedAgent = e? e.customerId || 0 : 0;
        this.editButton.disabled = !e || !e.id || e.isTransfer;
        this.deleteButton.disabled = !e || !e.id || e.isTransfer;
    }

    protected override preInit(): Observable<unknown> {
        return super.preInit()
            .pipe(tap(() => {
                const validUser = this.loginSrv.appCtx?.id > 0;
                this.editButton.visible   = validUser;
                this.addButton.visible    = validUser;
                this.deleteButton.visible = validUser;
            }));
    }

    ngOnInit() {
        super.ngOnInit();
    }
}
