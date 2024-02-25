import { Component, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import { CCGroup, Lookup } from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LoginService} from '@ss/common/api-common';
import {MatDialog} from '@angular/material/dialog';
import { InvoiceLinesService, InvoiceService } from '@ss/sales/api-invoice';
import {
    BaseTransactionDetailComponent,
    DOC_DELIVERY,
    DOC_QUOTATION,
    DOC_SALES_ORDER
} from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-invoice-detail',
    templateUrl: './invoice-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss']
})
export class InvoiceDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    public groups: CCGroup[];

    constructor(
        protected loginSrv: LoginService,
        public override detailSrv: InvoiceLinesService,
        public override entitySrv: InvoiceService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected dialog: MatDialog) {
        super(entitySrv, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'SALES_EDIT_INVOICE');
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
        return [
            {id: DOC_QUOTATION, description: 'LOGISTICS_PROFORMA'},
            {id: DOC_SALES_ORDER, description: 'SALES_ORDER'},
            {id: DOC_DELIVERY, description: 'SALES_DELIVERY'}
        ];
    }
}
