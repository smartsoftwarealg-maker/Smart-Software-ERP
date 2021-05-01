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

@Component({
    selector: 'ss-deposit-detail',
    styleUrls: ['./deposit-detail.component.scss'],
    templateUrl: './deposit-detail.component.html'
})
export class DepositDetailComponent extends BaseEntityDetailComponent<Deposit> {
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.agentService, 'id', 'denomination')
    public typeAutoCompleteModel = new DefaultAutoCompleteModel<DepositType>(this.typeSrv);
    public currencyAutoCompleteModel = new DefaultAutoCompleteModel<Currency>(this.currencySrv);


    constructor(
        private agentService: AgentService,
        private typeSrv: DepositTypeService,
        private loginSrv: LoginService,
        private currencySrv: CurrencyService,
        public exchangeService: CurrencyDepositService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(exchangeService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'EXCHANGE_CURRENCY_DEPOSIT');
    }


    public setupForm(b: Deposit) {
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
            debit: [{value: debit, disabled: b.amount < 0.000001}, Validators.required],
            credit: [{value: credit, disabled: b.amount > 0.000001}, Validators.required]
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
            this.form.controls[ctrl].disable({onlySelf: true, emitEvent: false});
        } else {
            this.form.controls[ctrl].enable();
        }
    }

    readForm(): Deposit {
        const value = super.readForm();
        value.amount = value['debit'] || 0 - value['credit'] || 0;
        value.userId = this.loginSrv.context.userId;
        value.centerId = this.loginSrv.context.center;
        return value;
    }
}
