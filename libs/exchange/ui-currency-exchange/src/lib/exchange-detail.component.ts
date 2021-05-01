import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {Currency, CurrencyService, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {CurrencyDepositService, DepositType, DepositTypeService, Deposit} from '@ss/exchange/api-currency-deposit';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {LoginService} from '@ss/common/api-common';
import {CurrencyExchangeService, Exchange} from '@ss/exchange/api-currency-exchange';

@Component({
    selector: 'ss-exchange-detail',
    styleUrls: ['./exchange-detail.component.scss'],
    templateUrl: './exchange-detail.component.html'
})
export class ExchangeDetailComponent extends BaseEntityDetailComponent<Exchange> {
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.agentService, 'id', 'denomination')
    public purchaseAutoCompleteModel = new DefaultAutoCompleteModel<Currency>(this.currencySrv);
    public salesAutoCompleteModel = new DefaultAutoCompleteModel<Currency>(this.currencySrv);


    constructor(
        private agentService: AgentService,
        private typeSrv: DepositTypeService,
        private loginSrv: LoginService,
        private currencySrv: CurrencyService,
        public exchangeService: CurrencyExchangeService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(exchangeService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'EXCHANGE_CURRENCY_DEPOSIT');
    }

    public setupForm(b: Exchange) {
        return this.formBuilder.group({
            id: [b.id],
            agentId: [b.agentId, Validators.required],
            exchDate: [b.exchDate, Validators.required],
            purchCurrency: [b.purchCurrency],
            amount: [b.amount, Validators.required],
            soldCurrency: [b.soldCurrency],
            memo: [b.memo],
            exchRate: [b.exchRate, Validators.required],
            // credit: [{value: credit, disabled: b.amount > 0.000001}, Validators.required]
        });
    }


    readForm(): Exchange {
        const value = super.readForm();
        value.userId = this.loginSrv.context.userId;
        value.centerId = this.loginSrv.context.center;
        return value;
    }
}
