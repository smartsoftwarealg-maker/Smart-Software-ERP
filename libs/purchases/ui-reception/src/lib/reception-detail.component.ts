import { Component, inject, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { Currency, CurrencyService, Lookup, LookupsService, PayMethod } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { Agent, SupplierService } from '@ss/logistics/api-agent';
import { BaseTransactionDetailComponent } from '@ss/logistics/api-transaction';
import { ReceptionService } from '@ss/purchases/api-reception';
import { LoginService, User } from '@ss/common/api-common';
import { PayMethodService } from '@ss/logistics/api-logistics-common';
import { UserListService } from '@ss/common/api-users';
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'ss-reception-detail',
    templateUrl: './reception-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss']
})
export class ReceptionDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    private currencySrv =  inject(CurrencyService);
    public usersSrv = inject(UserListService);
    public supplierSrv = inject(SupplierService);
    public lookupsSrv = inject(LookupsService);
    private payMethodSrv = inject(PayMethodService);

    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersSrv);
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination');
    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);
    public currencyCompleteModel = new DefaultAutoCompleteModel<Currency>(this.currencySrv);

    constructor(
        public receptionService: ReceptionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected readonly loginSrv: LoginService,
        protected dialog: MatDialog) {
        super(receptionService, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'STOCK_EDIT_RECEPTION');
    }

    protected showImportButton(): boolean {
        return true;
    }

    protected requireAgent(): boolean {
        return true;
    }

    // public override setupForm(form: Transaction) {
    //     // Make sure to update the template if you edit the configuration here
    //     return this.formBuilder.group({
    //         id: [form.id],
    //         document: [0],
    //         centerId: [form.centerId || this.loginSrv.appCtx.center],
    //         date: [form.date || new Date(), Validators.required],
    //         number: [{ value: form.number || 0, disabled: true }],
    //         reference: [form.reference],
    //         payMethod: [form.payMethod, Validators.required],
    //         referenceDocDate: [form.referenceDocDate],
    //         header: [form.header],
    //         footer: [form.footer],
    //         discountDescription: [form.discountDescription],
    //         fixedDiscount: [form.fixedDiscount || 0.0],
    //         fixedDiscountVAT: [form.fixedDiscountVAT || 0.0],
    //         dealer: [{ value: form.dealer || this.loginSrv.appCtx.id, disabled: !this.loginSrv.appCtx.manager }],
    //         currency: [form.currency || 10, Validators.required],
    //         currencyRate: [form.currencyRate || 1],
    //         agent: [form.agent, Validators.required]
    //     });
    // }

    override ngOnInit() {
        super.ngOnInit();
        this.currencySrv.load().subscribe();
    }

    protected requireAgentToImportDocument(): boolean {
        return true;
    }

    protected importedDocuments(): Lookup[] {
        return [{ id: 2, description: 'LOGISTICS_PURCHASE_ORDER' }];
    }
}
