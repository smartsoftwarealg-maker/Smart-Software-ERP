import { Component, inject, OnInit, ViewChild } from "@angular/core";
import {CCGroup, Lookup, LookupsService, PayMethod} from '@ss/common/api-lookup';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {ShellService, SnackBarService, ToolbarButton, KeepOnToolbar} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {fillObject, LanguageService, LoginService, User} from '@ss/common/api-common';
import {MatDialog} from '@angular/material/dialog';
import {DocImportComponent, DocImportService} from '@ss/logistics/ui-doc-import';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {DeliveryCancellationLinesListComponent} from './delivery-cancellation-lines-list.component';
import {DeliveryCancellationService} from '@ss/sales/api-delivery-cancellation';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {BaseTransactionDetailComponent, Transaction} from '@ss/logistics/api-transaction';
import {UserListService} from '@ss/common/api-users';

@Component({
    selector: 'ss-delivery-cancellation-detail',
    templateUrl: './delivery-cancellation-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss']
})
export class DeliveryCancellationDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    private usersSrv =  inject(UserListService);
    private payMethodSrv =  inject(PayMethodService);
    private agentService = inject(AgentService);

    public payModeAutoCompleteModel= new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);
    public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersSrv);
    public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.agentService, 'id', 'denomination')

    constructor(
        protected langSrv: LanguageService,
        protected loginSrv: LoginService,
        public deliveryService: DeliveryCancellationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        protected dialog: MatDialog,
        ) {
        super(deliveryService, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'SALES_EDIT_DELIVERY_CANCEL');
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
        return [{id: 257, description: 'SALES_DELIVERY'}];
    }
}
