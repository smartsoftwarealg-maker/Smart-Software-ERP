import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {CCGroup, Currency, CurrencyService, LookupsService, PayMethod} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {User, UserService} from '@ss/common/api-users';
import {fillObject, LoginService} from '@ss/common/api-common';
import {DatePipe} from '@angular/common';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {Transaction} from '@ss/logistics/api-transaction';
import {PurchaseOrderService} from '@ss/purchases/api-purchase-order';
import {PayMethodService} from '@ss/logistics/api-logistics-common';

@Component({
    selector: 'ss-ui-order-detail',
    templateUrl: './purchase-order-detail.component.html',
    styleUrls: ['./purchase-order-detail.component.scss']
})
export class PurchaseOrderDetailComponent extends BaseEntityDetailComponent<Transaction> {
    private order: Transaction = null;
    public isManager = false;
    public groups: CCGroup[];
    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersService);
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.agentService, 'id', 'denomination')
    public currencyCompleteModel = new DefaultAutoCompleteModel<Currency>(this.currencySrv)

    constructor(public orderService: PurchaseOrderService,
                public shellSrv: ShellService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public formBuilder: FormBuilder,
                public confirmationSrv: ConfirmationDialogService,
                public usersService: UserService,
                public lookupsSrv: LookupsService,
                private agentService: AgentService,
                private loginService: LoginService,
                private payMethodSrv: PayMethodService,
                private currencySrv: CurrencyService) {
        super(orderService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PURCHASES_EDIT_ORDER');
    }

    preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x))
    }

    public setupForm(form: Transaction) {
        // Make sure to update the template if you edit the configuration here
        if (!form.id) {
            form.id = 0;
            form.number = 0;
            form.userID = this.loginService.userSrv.userInfo.user.id;
            form.dealer = form.userID;
            form.date = new DatePipe('en').transform(new Date(), 'dd/MM/yyyy');
        }
        this.order = form;
        this.isManager = this.loginService.userSrv.userInfo.user.manager;
        return this.formBuilder.group({
            id: [form.id],
            document: [0],
            center: [0],
            date: [form.date, Validators.required],
            number: [form.number, Validators.required],
            reference: [form.reference],
            referenceDocDate: [form.referenceDocDate],
            payMethod: [form.payMethod, Validators.required],
            header: [form.header],
            footer: [form.footer],
            discountDescription: [form.discountDescription],
            fixedDiscount: [form.fixedDiscount || 0.0],
            fixedDiscountVAT: [form.fixedDiscountVAT || 0.0],
            currency: [form.currency || 10, Validators.required],
            currencyRate: [form.currencyRate || 1],
            dealer: [{value: form.dealer, disabled: !this.isManager}, Validators.required],
            agent: [form.agent, Validators.required],
        });
    }

    readForm(): Transaction {
        const form = super.readForm();
        fillObject(this.order, form)
        return form;
    }

}
