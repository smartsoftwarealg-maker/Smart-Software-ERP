import { Component, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {CCGroup, Lookup, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DeliveryService} from '@ss/sales/api-delivery';
import {LoginService} from '@ss/common/api-common';
import {MatDialog} from '@angular/material/dialog';
import { BaseTransactionDetailComponent, TransactionLinesService } from '@ss/logistics/api-transaction';


@Component({
    selector: 'ss-delivery-detail',
    templateUrl: './delivery-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss']
})
export class DeliveryDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    // private payMethodSrv =  inject(PayMethodService);
    // private agentService = inject(AgentService);
    // private usersSrv = inject(UserListService);
    public groups: CCGroup[];

    // public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersSrv);
    // public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.agentService, 'id', 'denomination');
    // public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);


    constructor(
        protected loginSrv: LoginService,
        public deliveryService: DeliveryService,
        public override detailSrv: TransactionLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        protected dialog: MatDialog) {
        super(deliveryService,
            detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            formBuilder,
            confirmationSrv,
            loginSrv,
            dialog,
            'SALES_EDIT_DELIVERY');
    }

    override preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x));
    }

    protected override showImportButton(): boolean {
        return true;
    }

    protected override requireAgentToImportDocument(): boolean {
        return true;
    }

    protected override requireAgent(): boolean {
        return true;
    }

    protected importedDocuments(): Lookup[] {
        return [{id: 1025, description: 'SALES_ORDER'}];
    }
}
