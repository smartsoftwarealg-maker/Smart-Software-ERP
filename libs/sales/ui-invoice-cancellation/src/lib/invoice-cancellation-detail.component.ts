import {Component, OnInit, ViewChild} from '@angular/core';
import {ShellService, SnackBarService, ToolbarButton, KeepOnToolbar } from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Lookup, LookupsService, PayMethod} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {fillObject, LanguageService, LoginService, User} from '@ss/common/api-common';
import {DatePipe} from '@angular/common';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {MatDialog} from '@angular/material/dialog';
import {DocImportComponent, DocImportService} from '@ss/logistics/ui-doc-import';
import {InvoiceCancellationLinesListComponent} from './invoice-cancellation-lines-list.component';
import {InvoiceCancellationService} from '@ss/sales/api-invoice-cancellation';
import {BaseTransactionDetailComponent, Transaction} from '@ss/logistics/api-transaction';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {UserListService} from '@ss/common/api-users';


@Component({
    selector: 'ss-invoice-detail',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss'],
    templateUrl: './invoice-cancellation-detail.component.html'
})
export class InvoiceCancellationDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersService)
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.agentService, 'id', 'denomination')


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
        public usersService: UserListService,
        public lookupsSrv: LookupsService,
        private agentService: AgentService,
        protected dialog: MatDialog,
        private payMethodSrv: PayMethodService) {
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
