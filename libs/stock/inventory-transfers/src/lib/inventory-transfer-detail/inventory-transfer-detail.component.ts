import { Component, inject } from '@angular/core';
import { BaseTransactionDetailComponent, TransactionLinesService } from "@ss/logistics/api-transaction";
import {CCGroup, Lookup, LookupsService} from '@ss/common/api-lookup';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LanguageService, LoginService, User} from '@ss/common/api-common';
import {Agent} from '@ss/logistics/api-agent';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UserListService} from '@ss/common/api-users';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TransferService} from '../transfer.service';
import {BranchService} from '@ss/logistics/api-agent';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'ss-inventory-transfer-detail',
    templateUrl: './inventory-transfer-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss']
})
export class InventoryTransferDetailComponent extends BaseTransactionDetailComponent {

    public groups: CCGroup[];

    constructor(
        public override detailSrv: TransactionLinesService,
        protected override loginSrv: LoginService,
        protected override dialog: MatDialog,
        public transferService: TransferService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(transferService, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'STOCK_TRANSFERS');
    }

    override preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x));
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
}
