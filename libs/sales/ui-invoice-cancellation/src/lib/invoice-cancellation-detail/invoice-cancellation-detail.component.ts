import { Component, OnInit } from '@angular/core';
import {ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {MatDialog} from '@angular/material/dialog';
import {InvoiceCancellationService} from '@ss/sales/api-invoice-cancellation';
import { BaseTransactionDetailComponent, TransactionLinesService } from '@ss/logistics/api-transaction';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from '@ss/common/ui-datepicker';


import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-invoice-cancellation-detail',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    templateUrl: './invoice-cancellation-detail.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        RouterModule,
        DatePickerComponent,
        UiAutoCompleteComponent


    ]
})
export class InvoiceCancellationDetailComponent extends BaseTransactionDetailComponent implements OnInit {
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
        public lookupsSrv: LookupsService,
        protected dialog: MatDialog,
    ) {
        super(invoiceService, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'SALES_EDIT_INVOICE_CANCEL');
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
        return [{ id: 258, description: 'COMMON_INVOICE' }];
    }
}
