import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Currency, CurrencyService, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {CurrencyDepositService, DepositType, DepositTypeService, Deposit} from '@ss/exchange/api-currency-deposit';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {AgentLookupModel, AgentService} from '@ss/logistics/api-agent';
import {LoginService} from '@ss/common/api-common';

@Component({
    selector: 'ss-deposit-detail',
    styleUrls: ['./deposit-detail.component.scss'],
    templateUrl: './deposit-detail.component.html'
})
export class DepositDetailComponent extends BaseEntityDetailComponent<Deposit> {
    public agentAutoCompleteModel    = new AgentLookupModel(this.agentService);
    public typeAutoCompleteModel     = new DefaultAutoCompleteModel<DepositType>(this.typeSrv);
    public currencyAutoCompleteModel = new DefaultAutoCompleteModel<Currency>(this.currencySrv);
    public soldAutoCompleteModel     = new DefaultAutoCompleteModel<Currency>(this.currencySrv);
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
        public lookupsSrv: LookupsService) {
        super(exchangeService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'EXCHANGE_CURRENCY_DEPOSIT');
        this.currencyAutoCompleteModel.onValueChanged = value => this.onCurrencyChange();
        this.soldAutoCompleteModel.onValueChanged = value => this.onCurrencyChange();
        this.typeAutoCompleteModel.onValueChanged = value => this.onTypeChange();
        this.typeAutoCompleteModel.filterLoadedData = x => x.filter(e => e.id === 1 || e.id === 2);
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
            commission: [{ value: b.commission, disabled: false }],
            soldCurrencyId: [{ value: b.soldCurrencyId, disabled: b.amount < 0.0}],
            exchangeRate: [b.exchangeRate || 1 ],
            soldAmount: [{ value: b.amount > 0.0? ((b.exchangeRate || 1) * b.amount) : 0.0, disabled: true }],
            debit: [{ value: debit, disabled: b.amount < 0.000001}, Validators.required],
            credit: [{ value: credit, disabled: b.amount > 0.000001}, Validators.required],
            withdrawn: [b.withdrawn]
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
            // this.form.controls['soldAmount']?.enable();
            // this.form.controls['exchangeRate']?.enable();
        } else {
            this.form.controls[ctrl].enable();
            // this.form.controls['soldAmount']?.disable({onlySelf: true, emitEvent: false});
            // this.form.controls['exchangeRate']?.disable({onlySelf: true, emitEvent: false});
        }
        const soldAmount = this.form.controls['exchangeRate'].value *
            (this.form.controls['debit'].value - this.form.controls['credit'].value);
        this.form.controls['soldAmount'].setValue(soldAmount.toFixed(2));
    }

    readForm(): Deposit {
        const value = super.readForm();
        value.amount = value['debit'] || 0 - value['credit'] || 0;
        value.userId = this.loginSrv.appCtx?.id;
        value.centerId = this.loginSrv.appCtx.center;
        return value;
    }

    private onCurrencyChange() {
        const withdrawn = this.currencyAutoCompleteModel.cache;
        const sold      = this.soldAutoCompleteModel.cache;
        if (withdrawn && sold) {
            const value = sold.exchangeRate / (withdrawn.exchangeRate || 1.0);
            this.form.controls['exchangeRate'].setValue(+value.toFixed(4));
        }
        const soldAmount = this.form.controls['exchangeRate'].value *
            (this.form.controls['debit'].value - this.form.controls['credit'].value);
        this.form.controls['soldAmount'].setValue(soldAmount.toFixed(2));
    }

    onRateChange() {
        const soldAmount = this.form.controls['exchangeRate'].value *
            (this.form.controls['debit'].value - this.form.controls['credit'].value);
        this.form.controls['soldAmount'].setValue(soldAmount.toFixed(2));
    }

    private onTypeChange() {
        const dType = this.typeAutoCompleteModel.cache;
        if (dType && dType.commissioned) {
            this.form.controls['commission'].enable({ onlySelf: true, emitEvent: false });
        } else {
            this.form.controls['commission'].disable({ onlySelf: true, emitEvent: false });
            this.form.controls['commission'].setValue(0.0, { onlySelf: true, emitEvent: false });
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this.currencySrv.load().subscribe();
    }
}
