import { Component, inject } from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import { CCGroup, CurrencyService, Lookup, LookupsService, PayMethod } from "@ss/common/api-lookup";
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {fillObject, LoginService, User} from '@ss/common/api-common';
import {DatePipe} from '@angular/common';
import {Agent, SupplierService} from '@ss/logistics/api-agent';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {BaseTransactionDetailComponent, Transaction} from '@ss/logistics/api-transaction';
import {UserListService} from '@ss/common/api-users';
import {PurchaseQuotationService} from '../purchase-quotation.service';
import {OfferLinesService} from '@ss/logistics/api-transaction';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'ss-proforma-detail',
    templateUrl: './quotation-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss']
})
export class QuotationDetailComponent extends BaseTransactionDetailComponent {
    private payMethodSrv = inject(PayMethodService);
    public supplierSrv = inject(SupplierService);
    private usersSrv = inject(UserListService);
    public  dealerAutoCompleteModel  = new DefaultAutoCompleteModel<User>(this.usersSrv);
    public  agentAutoCompleteModel   = new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination');
    public  payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);

    constructor(public proformaSrv: PurchaseQuotationService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override router: Router,
                public override formBuilder: UntypedFormBuilder,
                public override confirmationSrv: ConfirmationDialogService,
                public lookupsSrv: LookupsService,
                protected loginSrv: LoginService,
                protected override dialog: MatDialog) {
        super(proformaSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'PURCHASES_QUOTATION');
    }

    protected importedDocuments(): Lookup[] {
        return [];
    }

    protected requireAgent(): boolean {
        return false;
    }

    protected requireAgentToImportDocument(): boolean {
        return false;
    }

    protected showImportButton(): boolean {
        return false;
    }

    // public override setupForm(form: Transaction) {
    //     // Make sure to update the template if you edit the configuration here
    //     if (!form.id) {
    //         form.id = 0;
    //         form.number = 0;
    //         form.userID = this.loginSrv.appCtx.id;
    //         form.dealer = form.userID;
    //         form.date = new DatePipe('en').transform(new Date(), 'dd/MM/yyyy');
    //     }
    //     this.id = form.id || 0;
    //     this.detailSrv.setParentId(this.id);
    //     this.transac = form;
    //     this.isManager = this.loginSrv.appCtx.manager;
    //     return this.formBuilder.group({
    //         id: [form.id],
    //         document: [0],
    //         centerId: [0 || this.loginSrv.appCtx.center],
    //         date: [form.date, Validators.required],
    //         number: [form.number],
    //         payMethod: [form.payMethod, Validators.required],
    //         reference: [form.reference],
    //         referenceDocDate: [form.referenceDocDate],
    //         header: [form.header],
    //         footer: [form.footer],
    //         discountDescription: [form.discountDescription],
    //         fixedDiscount: [form.fixedDiscount || 0.0],
    //         fixedDiscountVAT: [form.fixedDiscountVAT || 0.0],
    //         dealer: [{value: form.dealer || this.loginSrv.appCtx.id, disabled: !this.isManager}, Validators.required],
    //         agent: [form.agent, Validators.required],
    //     });
    // }
    //
    // override readForm(): Transaction {
    //     const form = super.readForm();
    //     fillObject(this.transac, form)
    //     return form;
    // }
}
