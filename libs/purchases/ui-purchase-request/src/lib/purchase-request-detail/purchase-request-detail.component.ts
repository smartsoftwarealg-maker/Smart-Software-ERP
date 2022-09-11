import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Transaction} from '@ss/logistics/api-transaction';
import {CCGroup, Currency, CurrencyService, LookupsService, PayMethod} from '@ss/common/api-lookup';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LoginService, User} from '@ss/common/api-common';
import {Agent, SupplierService} from '@ss/logistics/api-agent';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UserListService} from '@ss/common/api-users';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {PurchaseRequestService} from '../purchase-request.service';

@Component({
    selector: 'ss-purchase-request-detail',
    templateUrl: './purchase-request-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss']
})
export class PurchaseRequestDetailComponent  extends BaseEntityDetailComponent<Transaction> implements OnInit {
    private order: Transaction = null;
    public isManager = false;
    public groups: CCGroup[];
    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersService);
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination')
    public currencyCompleteModel = new DefaultAutoCompleteModel<Currency>(this.currencySrv)

    constructor(public orderService: PurchaseRequestService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override formBuilder: UntypedFormBuilder,
                public override confirmationSrv: ConfirmationDialogService,
                public usersService: UserListService,
                public lookupsSrv: LookupsService,
                private supplierSrv: SupplierService,
                private loginService: LoginService,
                private payMethodSrv: PayMethodService,
                private loginSrv: LoginService,
                private currencySrv: CurrencyService) {
        super(orderService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PURCHASES_PURCHASE_REQUEST');
    }

    override preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x))
    }

    public setupForm(form: Transaction) {
        // Make sure to update the template if you edit the configuration here
        if (!form.id) {
            form.id = 0;
            form.number = 0;
            form.userID = this.loginService.appCtx.id;
            form.dealer = form.userID;
            form.date = new DatePipe('en').transform(new Date(), 'dd/MM/yyyy');
        }
        this.order = form;
        this.isManager = this.loginService.appCtx.manager;
        return this.formBuilder.group({
            id: [form.id],
            document: [0],
            centerId: [0],
            date: [form.date, Validators.required],
            number: [form.number],
            reference: [form.reference],
            referenceDocDate: [form.referenceDocDate],
            payMethod: [form.payMethod],
            header: [form.header],
            footer: [form.footer],
            discountDescription: [form.discountDescription],
            fixedDiscount: [form.fixedDiscount || 0.0],
            fixedDiscountVAT: [form.fixedDiscountVAT || 0.0],
            currency: [form.currency || 10, Validators.required],
            currencyRate: [form.currencyRate || 1],
            dealer: [{value: form.dealer || this.loginSrv.appCtx.id, disabled: !this.isManager}, Validators.required],
            agent: [form.agent],
        });
    }

    override readForm(): Transaction {
        return this.form.getRawValue();
    }
}
