import { Component, inject, OnInit } from '@angular/core';
import {ShellService, SnackBarService } from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {Lookup, LookupsService, PayMethod} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LanguageService, LoginService, User} from '@ss/common/api-common';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {MatDialog} from '@angular/material/dialog';
import {InvoiceCancellationService} from '@ss/sales/api-invoice-cancellation';
import {BaseTransactionDetailComponent} from '@ss/logistics/api-transaction';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {UserListService} from '@ss/common/api-users';


@Component({
    selector: 'ss-invoice-detail',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss'],
    templateUrl: './invoice-cancellation-detail.component.html'
})
export class InvoiceCancellationDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    private payMethodSrv =  inject(PayMethodService);
    private usersSrv =  inject(UserListService);
    private agentService =  inject(AgentService);

    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersSrv);
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.agentService, 'id', 'denomination');


    constructor(
        private langSrv: LanguageService,
        protected override loginSrv: LoginService,
        public invoiceService: InvoiceCancellationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        protected dialog: MatDialog,
    ) {
        super(invoiceService, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'SALES_EDIT_INVOICE_CANCEL');
    }


    protected requireAgent(): boolean {
        return true;
    }

    protected requireAgentToImportDocument(): boolean {
        return true;
    }

    protected showImportButton(): boolean {
        return true;
    }

    protected importedDocuments(): Lookup[] {
        return [{ id: 258, description: 'SALES_INVOICE' }];
    }
}
