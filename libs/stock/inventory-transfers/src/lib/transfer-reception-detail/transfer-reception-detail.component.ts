import { Component, OnInit } from '@angular/core';
import { BaseTransactionDetailComponent, TransactionLinesService } from "@ss/logistics/api-transaction";
import {CCGroup, Lookup} from '@ss/common/api-lookup';
import {LoginService} from '@ss/common/api-common';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TransferReceptionService} from '../transfer-reception.service';

@Component({
    selector: 'ss-transfer-reception-detail',
    templateUrl: './transfer-reception-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss']
})
export class TransferReceptionDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    public groups: CCGroup[];

    constructor(
        protected override loginSrv: LoginService,
        protected override dialog: MatDialog,
        public transferService: TransferReceptionService,
        public override detailSrv: TransactionLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(transferService, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'STOCK_TRANSFER_RECEPTIONS');
    }

    override preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x));
    }

    protected showImportButton(): boolean {
        return false;
    }
    protected requireAgentToImportDocument(): boolean {
        return true;
    }
    protected requireAgent(): boolean {
        return true;
    }
    protected importedDocuments(): Lookup[] {
        return [];
    }

}
