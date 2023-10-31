import { Component, OnInit } from '@angular/core';
import {ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {MatDialog} from '@angular/material/dialog';
import {InvoiceCancellationService} from '@ss/sales/api-invoice-cancellation';
import { BaseTransactionDetailComponent, TransactionLinesService } from '@ss/logistics/api-transaction';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { LogisticsUiDocInfoModule } from '@ss/logistics/ui-doc-info';
import { LogisticsUiDocImportModule } from '@ss/logistics/ui-doc-import';

@Component({
    selector: 'ss-complement-invoice-detail',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    templateUrl: './complement-invoice-detail.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        LogisticsUiDocInfoModule,
        LogisticsUiDocImportModule
    ],
})
export class ComplementInvoiceDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    constructor(
        public override detailSrv: TransactionLinesService,
        protected override loginSrv: LoginService,
        public invoiceService: InvoiceCancellationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public override lookupsSrv: LookupsService,
        protected override dialog: MatDialog) {
        super(invoiceService,
            detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            formBuilder,
            confirmationSrv,
            loginSrv,
            dialog,
            'SALES_COMPLEMENT_CANCEL');
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
