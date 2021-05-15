import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {Currency, CurrencyService, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {CurrencyDepositService, DepositType, DepositTypeService, Deposit} from '@ss/exchange/api-currency-deposit';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Agent, AgentLookupModel, AgentService} from '@ss/logistics/api-agent';
import {LoginService, AppContextService} from '@ss/common/api-common';

@Component({
    selector: 'ss-deposit-detail',
    styleUrls: ['./cash-commission-detail.component.scss'],
    templateUrl: './cash-commission-detail.component.html'
})
export class CashCommissionDetailComponent extends BaseEntityDetailComponent<Deposit> {
    public agentAutoCompleteModel = new AgentLookupModel(this.agentService);
    public typeAutoCompleteModel = new DefaultAutoCompleteModel<DepositType>(this.typeSrv);
    public currencyAutoCompleteModel = new DefaultAutoCompleteModel<Currency>(this.currencySrv);
    public soldAutoCompleteModel = new DefaultAutoCompleteModel<Currency>(this.currencySrv);
    public customerId = 0;

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
        public lookupsSrv: LookupsService,
        private contextSrv: AppContextService) {
        super(exchangeService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'EXCHANGE_COMMISSIONS');
        this.typeAutoCompleteModel['onValueChanged'] = value => this.onTypeChange();
    }


    public setupForm(b: Deposit) {
        const debit = b.amount > 0 ? b.amount : 0;
        const credit = b.amount < 0 ? -b.amount : 0;
        this.customerId = b.customerId;
        if (b.depositType) {
            this.typeAutoCompleteModel
                .getById(b.depositType)
                .subscribe(res => {
                    this.typeAutoCompleteModel.cache = res;
                    this.onTypeChange();
                });
        }
        return this.formBuilder.group({
            id: [b.id],
            customerId: [b.customerId, Validators.required],
            excDate: [b.excDate || new Date(), Validators.required],
            depositType: [b.depositType],
            description: [b.description],
            currencyId: [b.currencyId],
            amount: [b.amount],
            commission: [{ value: b.commission, disabled: false }, Validators.compose([Validators.required, Validators.min(1.0)])],
            soldCurrencyId: [{ value: b.soldCurrencyId, disabled: b.amount < 0.0}],
            exchangeRate: [{ value: b.exchangeRate || 1, disabled: b.amount < 0.0 }],
            soldAmount: [{ value: b.amount > 0.0? ((b.exchangeRate || 1) * b.amount).toFixed(5) : 0.0, disabled: true }],
            debit: [{ value: debit, disabled: b.amount < 0.000001}, Validators.required],
            credit: [{ value: credit, disabled: b.amount > 0.000001}, Validators.required]
        });
    }

    // onDebitChange(event: Event) {
    //     this.onAmountChange(event, 'credit');
    // }
    //
    // onCreditChange(event: Event) {
    //     this.onAmountChange(event, 'debit');
    // }

    // private onAmountChange(event: Event, ctrl: string) {
    //     const value = event.target['value'] || 0;
    //     if (value > 0.0) {
    //         this.form.controls[ctrl].setValue(0);
    //         this.form.controls[ctrl].disable({onlySelf: true, emitEvent: false});
    //         this.form.controls['soldAmount']?.enable();
    //         this.form.controls['exchangeRate']?.enable();
    //         const soldAmount = this.form.controls['exchangeRate'].value *
    //             (this.form.controls['debit'].value - this.form.controls['credit'].value);
    //         this.form.controls['soldAmount'].setValue(soldAmount);
    //     } else {
    //         this.form.controls[ctrl].enable();
    //         this.form.controls['soldAmount']?.disable({onlySelf: true, emitEvent: false});
    //         this.form.controls['exchangeRate']?.disable({onlySelf: true, emitEvent: false});
    //     }
    // }

    readForm(): Deposit {
        const value = super.readForm();
        value.amount = 0;
        value.userId = this.contextSrv.context.userId;
        value.centerId = this.contextSrv.context.center;
        return value;
    }

    // private onCurrencyChange() {
    //     const withdrawn = this.currencyAutoCompleteModel.cache;
    //     const sold      = this.soldAutoCompleteModel.cache;
    //     if (withdrawn && sold) {
    //         const value = sold.exchangeRate / (withdrawn.exchangeRate || 1.0);
    //         this.form.controls['exchangeRate'].setValue(value.toFixed(5));
    //     }
    // }

    private onTypeChange() {
        const dType = this.typeAutoCompleteModel.cache;
        if (dType && !dType.commissioned) {
            this.form.controls['commission'].enable({ onlySelf: true, emitEvent: false });
        } else {
            this.form.controls['commission'].disable({ onlySelf: true, emitEvent: false });
            this.form.controls['commission'].setValue(0.0, { onlySelf: true, emitEvent: false });
        }
    }
}
