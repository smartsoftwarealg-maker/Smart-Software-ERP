import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
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
        'denomination',
        'excDate',
        'type',
        'credit',
        'debit',
    ];

    constructor(
        private depositTypeSrv: DepositTypeService,
        public exchangeSrv: CurrencyDepositService,
        public agentService: AgentService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public lookupSrv: LookupsService,
        public confirmationSrv: ConfirmationDialogService) {
        super(exchangeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'EXCHANGE_CURRENCY_DEPOSIT');
    }

    processLoadedData(data: Deposit[]): Observable<Deposit[]> {
        return this.agentService
            .getByIDList(data.map(x => x.customerId))
            .pipe(switchMap(res => {
                      data.forEach(d => d.denomination = res.find(e => e.id == d.customerId)?.denomination);
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
