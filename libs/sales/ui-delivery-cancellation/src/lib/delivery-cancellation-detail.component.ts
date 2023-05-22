import { Component, OnInit } from '@angular/core';
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LanguageService, LoginService} from '@ss/common/api-common';
import {MatDialog} from '@angular/material/dialog';
import {DeliveryCancellationService} from '@ss/sales/api-delivery-cancellation';
import {BaseTransactionDetailComponent} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-delivery-cancellation-detail',
    templateUrl: './delivery-cancellation-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss']
})
export class DeliveryCancellationDetailComponent extends BaseTransactionDetailComponent implements OnInit {
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
        protected dialog: MatDialog) {
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
