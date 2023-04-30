import { Component, inject, OnInit } from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import { CCGroup, CurrencyService, Lookup, LookupsService, PayMethod } from "@ss/common/api-lookup";
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LoginService, User} from '@ss/common/api-common';
import { Agent, AgentService, SupplierService } from "@ss/logistics/api-agent";
import {MatDialog} from '@angular/material/dialog';
import {InvoiceService} from '@ss/sales/api-invoice';
import {BaseTransactionDetailComponent} from '@ss/logistics/api-transaction';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {UserListService} from '@ss/common/api-users';


@Component({
    selector: 'ss-invoice-detail',
    templateUrl: './invoice-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss']
})
export class InvoiceDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    private agentService = inject(AgentService);
    private payMethodSrv = inject(PayMethodService);
    private usersSrv = inject(UserListService);
    public groups: CCGroup[];
    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersSrv);
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.agentService, 'id', 'denomination');


    constructor(
        protected loginSrv: LoginService,
        public override entitySrv: InvoiceService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        private lookupsSrv: LookupsService,
        protected dialog: MatDialog) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'SALES_EDIT_INVOICE');
    }


    override preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x));
    }

    protected showImportButton(): boolean {
        return true;
    }

    protected requireAgentToImportDocument(): boolean {
        return true;
    }

    protected requireAgent(): boolean {
        return true;
    }

    protected importedDocuments(): Lookup[] {
        return [{id: 6, description: 'SALES_PROFORMA'}, {id: 257, description: 'SALES_DELIVERY'}];
    }

    // public override setupForm(b: Transaction) {
    //     // Make sure to update the template if you edit the configuration here
    //     if (!b.id) {
    //         b.id = 0;
    //         b.number = 0;
    //         b.userID = this.loginSrv.appCtx.id;
    //         b.dealer = b.userID;
    //         b.date = new DatePipe('en').transform(new Date(), 'dd/MM/yyyy');
    //     }
    //     this.isManager = this.loginSrv.appCtx.manager;
    //     return this.formBuilder.group({
    //         id: [b.id],
    //         document: [0],
    //         centerId: [0 || this.loginSrv.appCtx.center],
    //         date: [b.date || this.langSrv.formatDate(new Date()), Validators.required],
    //         number: [b.number || 0],
    //         reference: [b.reference],
    //         referenceDocDate: [b.referenceDocDate],
    //         payMethod: [b.payMethod, Validators.required],
    //         header: [b.header],
    //         footer: [b.footer],
    //         discountDescription: [b.discountDescription],
    //         fixedDiscount: [b.fixedDiscount || 0.0],
    //         fixedDiscountVAT: [b.fixedDiscountVAT || 0.0],
    //         dealer: [{ value: b.dealer || this.loginSrv.appCtx.id, disabled: !this.isManager }, Validators.required],
    //         agent: [b.agent, true? Validators.required : null],
    //     });
    // }
}
