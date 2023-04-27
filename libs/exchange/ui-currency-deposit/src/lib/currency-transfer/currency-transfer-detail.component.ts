import { Component, inject } from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Currency, CurrencyService, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {
    DepositType,
    DepositTypeService,
    Deposit,
    CurrencyTransferService
} from '@ss/exchange/api-currency-deposit';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Agent, AgentLookupModel, AgentService} from '@ss/logistics/api-agent';
import {LoginService} from '@ss/common/api-common';

@Component({
    selector: 'ss-transfer-detail',
    styleUrls: ['./currency-transfer-detail.component.scss'],
    templateUrl: './currency-transfer-detail.component.html'
})
export class CurrencyTransferDetailComponent extends BaseEntityDetailComponent<Deposit> {
    private agentService = inject(AgentService);
    private currencySrv = inject(CurrencyService);
    public agentAutoCompleteModel    = new AgentLookupModel(this.agentService);
    public typeAutoCompleteModel     = new DefaultAutoCompleteModel<DepositType>(this.typeSrv);
    public currencyAutoCompleteModel = new DefaultAutoCompleteModel<Currency>(this.currencySrv);
    public soldAutoCompleteModel     = new DefaultAutoCompleteModel<Currency>(this.currencySrv);
    public customerId = 0;
    private sourceId: number = null;

    constructor(
        private typeSrv: DepositTypeService,
        private loginSrv: LoginService,
        public transferService: CurrencyTransferService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(transferService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'EXCHANGE_TRANSFERS');
        this.typeAutoCompleteModel['onValueChanged'] = value => this.onTypeChange();
        this.currencyAutoCompleteModel['onValueChanged'] = value => this.onCurrencyChange();
        this.soldAutoCompleteModel['onValueChanged'] = value => this.onCurrencyChange();
        this.typeAutoCompleteModel.filterLoadedData = x => x.filter(e => e.id === 3);
    }


    public override setupForm(b: Deposit) {
        this.customerId = b.customerId;
        this.sourceId = b.sourceId;
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
            sourceId: [b.sourceId],
            customerId: [b.customerId, Validators.required],
            excDate: [b.excDate || new Date(), Validators.required],
            depositType: [{ value: b.depositType || 3, disabled: true } ],
            description: [b.description],
            currencyId: [b.currencyId],
            amount: [b.amount],
            commission: [{ value: b.commission, disabled: false }],
            soldCurrencyId: [b.soldCurrencyId],
            exchangeRate: [ b.exchangeRate? +b.exchangeRate.toFixed(5) || 1 : 1],
            soldAmount: [{ value: b.amount > 0.0? (((b.exchangeRate || 1) * b.amount).toFixed(2)) : 0.0, disabled: true }],
        });
    }


    override readForm(): Deposit {
        const value = super.readForm();
        value.userId = this.loginSrv.appCtx.id;
        value.centerId = this.loginSrv.appCtx.center;
        value.sourceId = this.sourceId;
        value.depositType = 3;
        return value;
    }


    private onTypeChange() {
        const dType = this.typeAutoCompleteModel.cache;
        if (dType && !dType.commissioned) {
            this.form.controls['commission'].enable({ onlySelf: true, emitEvent: false });
        } else {
            this.form.controls['commission'].disable({ onlySelf: true, emitEvent: false });
            this.form.controls['commission'].setValue(0.0, { onlySelf: true, emitEvent: false });
        }
    }


    onRateChange() {
        const soldAmount = this.form.controls['exchangeRate'].value *
                           this.form.controls['amount'].value;
        this.form.controls['soldAmount'].setValue(+soldAmount.toFixed(2));
    }

    private onCurrencyChange() {
        const withdrawn = this.currencyAutoCompleteModel.cache;
        const sold      = this.soldAutoCompleteModel.cache;
        if (withdrawn && sold) {
            const value = sold.exchangeRate / (withdrawn.exchangeRate || 1.0);
            this.form.controls['exchangeRate'].setValue(+value.toFixed(4));
        }
        const soldAmount = this.form.controls['exchangeRate'].value *
                           this.form.controls['amount'].value;
        this.form.controls['soldAmount'].setValue(soldAmount.toFixed(2));
    }

    onAmountChange(event: Event) {
        const soldAmount = this.form.controls['exchangeRate'].value *
                           this.form.controls['amount'].value;
        this.form.controls['soldAmount'].setValue(+soldAmount.toFixed(2));
    }

    ngOnInit() {
        super.ngOnInit();
        this.currencySrv.load().subscribe();
    }
}
