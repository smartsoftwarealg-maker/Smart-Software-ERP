import { Component, inject, OnInit } from '@angular/core';
import {Currency, CurrencyService, LookupsService, LotsService, Store} from '@ss/common/api-lookup';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LoginService} from '@ss/common/api-common';
import {ERR, Option, OptionService} from '@ss/logistics/ui-options';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';

interface EvalPrice {
    id: any,
    name: string
}

@Component({
    selector: 'ss-price-recalculation',
    templateUrl: './price-recalculation.component.html',
    styleUrls: ['./price-recalculation.component.scss'],
})
export class PriceRecalculationComponent extends BaseEntityDetailComponent<Option> implements OnInit {
    private storeNameSrv =  inject(LotsService);

    evalPriceOptions: EvalPrice[] = [
        {id: 1, name: 'LOGISTICS_FIFO'},
        {id: 2, name: 'LOGISTICS_AWP'}
    ];

    processing = false;
    data: ERR[] = [];
    selected: ERR = null;
    displayedColumns = [
        'document',
        'number',
        'date',
        'reference',
        'description',
    ];

    currencies: Currency[] = [];
    storeAutoCompleteModel: DefaultAutoCompleteModel<Store> = new DefaultAutoCompleteModel<Store>(this.storeNameSrv);

    constructor(
        private loginSrv: LoginService,
        public optionSrv: OptionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private currencySrv: CurrencyService) {
        super(optionSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_PRICE_RECALCULATION');
    }

    public override setupForm(a: Option) {
        return this.formBuilder.group({
            id: [this.loginSrv.appCtx.center],
            eval_price: [{value: a.eval_price || 1, disabled: true }],
            mainStore: [a.mainStore],
            generate_GL: [a.generate_GL],
            inventory_date: [new Date(), Validators.required],
            defaultCurrency: [a.defaultCurrency, Validators.required]
        });
    }

    override loadEntity(id: number): Observable<Option> {
        this.id = this.loginSrv.appCtx.center;
        return super.loadEntity(this.id);
    }

    override ngOnInit() {
        this.saveButton.visible = false;
        super.ngOnInit();
        this.currencySrv
            .getList(0, 50)
            .subscribe(res => this.currencies = res.body);
    }

    recalculate() {
        this.shellSrv.setLoading(true);
        const value = this.form.value;
        this.processing = true;
        this.optionSrv
            .recalculatePrice(value.inventory_date)
            .subscribe({
                next: res => {
                    this.data = res;
                    this.snackBarSrv.showSuccessMessage();
                    this.shellSrv.setLoading(false);
                    this.processing = false;
                },
                error: err => {
                    this.shellSrv.setLoading(false);
                    this.processing = false;
                    if (err.statusText?.length > 10) {
                        throw err;
                    } else {
                        this.snackBarSrv.showSuccessMessage();
                    }
                }
            });
    }

    select(item: ERR) {
        this.selected = item;
    }
}
