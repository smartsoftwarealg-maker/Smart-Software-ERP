import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {CCGroup, Currency, CurrencyService, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {CurrencyExchangeService, DepositType, DepositTypeService, Exchange} from '@ss/exchange/api-currency-exchange';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Agent, AgentService} from '@ss/logistics/api-agent';

@Component({
    selector: 'ss-exchange-detail',
    styleUrls: ['./exchange-detail.component.scss'],
    templateUrl: './exchange-detail.component.html'
})
export class ExchangeDetailComponent extends BaseEntityDetailComponent<Exchange> {
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.agentService, 'id', 'denomination')
    public typeAutoCompleteModel = new DefaultAutoCompleteModel<DepositType>(this.typeSrv);
    public currencyAutoCompleteModel = new DefaultAutoCompleteModel<Currency>(this.currencySrv);


    constructor(
        private agentService: AgentService,
        private typeSrv: DepositTypeService,
        private currencySrv: CurrencyService,
        public exchangeService: CurrencyExchangeService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(exchangeService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'EXCHANGE_EDIT_EXCHANGE');
    }


    public setupForm(b: Exchange) {
        const debit = b.amount > 0 ? b.amount : 0;
        const credit = b.amount < 0 ? -b.amount : 0;

        return this.formBuilder.group({
            id: [b.id],
            customerId: [b.customerId, Validators.required],
            excDate: [b.excDate, Validators.required],
            depositType: [b.depositType],
            description: [b.description],
            currencyId: [b.currencyId],
            amount: [b.amount],
            debit: [{ value: debit,   disabled: b.amount < 0.000001 }, Validators.required],
            credit: [{ value: credit, disabled: b.amount > 0.000001 }, Validators.required]
        });
    }

    onDebitChange(event: Event) {
        this.onAmountChange(event, 'credit');
    }

    onCreditChange(event: Event) {
        this.onAmountChange(event, 'debit');
    }

    private onAmountChange(event: Event, ctrl: string) {
        const value = event.target['value'] || 0;
        if (value > 0.0) {
            this.form.controls[ctrl].setValue(0);
            this.form.controls[ctrl].disable({ onlySelf: true, emitEvent: false });
        } else {
            this.form.controls[ctrl].enable();
        }
    }

  readForm(): Exchange {
      const  value = super.readForm();
      value.amount = value['debit'] || 0 - value['credit'] || 0;
      return value;
  }
}
