import {Component, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {
    LookupsService,
    Store,
    LotsService,
    PayMethod,
    PayMode,
    PayModeService,
    Currency,
    CurrencyService
} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Option} from './option.class';
import {OptionService} from './option.service';
import {LoginService} from "@ss/common/api-common";

interface EvalPrice {
    id: any,
    name: string
}

@Component({
    selector: 'ss-account-detail',
    styleUrls: ['./options-detail.component.scss'],
    templateUrl: './options-detail.component.html'
})
export class OptionsDetailComponent extends BaseEntityDetailComponent<Option> implements OnInit {
    evalPriceOptions: EvalPrice[] = [
        {id: 1, name: 'LOGISTICS_FIFO'},
        {id: 2, name: 'LOGISTICS_AWP'}
    ]

    currencies: Currency[] = [];
    storeAutoCompleteModel: DefaultAutoCompleteModel<Store> = new DefaultAutoCompleteModel<Store>(this.storeNameSrv);

    constructor(
        private loginSrv: LoginService,
        public optionSrv: OptionService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: UntypedFormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private currencySrv: CurrencyService,
        private storeNameSrv: LotsService) {
        super(optionSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_OPTION');
    }

    public setupForm(a: Option) {
        return this.formBuilder.group({
            id: [this.loginSrv.appCtx.center],
            eval_price: [a.eval_price || 1, Validators.required],
            mainStore: [a.mainStore],
            generate_GL: [a.generate_GL],
            inventory_date: [a.inventory_date, Validators.required],
            defaultCurrency: [a.defaultCurrency, Validators.required]
        });
    }

    loadEntity(id: number): Observable<Option> {
        this.id = this.loginSrv.appCtx.center;
        return super.loadEntity(this.id);
    }

    ngOnInit() {
        super.ngOnInit();
        this.currencySrv
            .getList(0, 50)
            .subscribe(res => this.currencies = res.body);
    }
}
