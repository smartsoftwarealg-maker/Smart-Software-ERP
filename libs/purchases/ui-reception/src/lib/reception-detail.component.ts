import {Component, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {CCGroup, Currency, CurrencyService, LookupsService, PayMethod} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {Transaction} from '@ss/logistics/api-transaction';
import {ReceptionService} from '@ss/purchases/api-reception';
import {LoginService, User} from '@ss/common/api-common';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {UserListService} from '@ss/common/api-users';


@Component({
    selector: 'ss-reception-detail',
    templateUrl: './reception-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss']
})
export class ReceptionDetailComponent extends BaseEntityDetailComponent<Transaction> implements OnInit {

    public groups: CCGroup[];
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersService)
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.agentService, 'id', 'denomination')
    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);
    public currencyCompleteModel = new DefaultAutoCompleteModel<Currency>(this.currencySrv)

    constructor(
        public receptionService: ReceptionService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public usersService: UserListService,
        public agentService: AgentService,
        public lookupsSrv: LookupsService,
        public readonly loginSrv: LoginService,
        private payMethodSrv: PayMethodService,
        private currencySrv: CurrencyService) {
        super(receptionService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_EDIT_RECEPTION');
    }


    preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x))
    }

    public setupForm(form: Transaction) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [form.id],
            document: [0],
            center: [0],
            date: [form.date || new Date(), Validators.required],
            number: [form.number, Validators.required],
            reference: [form.reference],
            payMethod: [form.payMethod, Validators.required],
            referenceDocDate: [form.referenceDocDate],
            header: [form.header],
            footer: [form.footer],
            discountDescription: [form.discountDescription],
            fixedDiscount: [form.fixedDiscount || 0.0],
            fixedDiscountVAT: [form.fixedDiscountVAT || 0.0],
            dealer: [form.dealer || this.loginSrv.appCtx.id, Validators.required],
            currency: [form.currency || 10, Validators.required],
            currencyRate: [form.currencyRate || 1],
            agent: [form.agent, Validators.required]
        });
    }

    ngOnInit() {
        super.ngOnInit();
        this.currencySrv.load().subscribe();
    }
}
