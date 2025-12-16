import { Component, input, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {
    UntypedFormBuilder,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { Lookup } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { MatDialog } from '@angular/material/dialog';
import {
    BaseTransactionDetailComponent,
    DOC_DELIVERY,
    DOC_QUOTATION,
    DOC_SALES_ORDER,
} from '@ss/logistics/api-transaction';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FreeInvoiceService } from '../free-invoice.service';
import { FreeInvoiceLinesService } from '../invoice-lines.service';

@Component({
    selector: 'ss-free-invoice-detail',
    templateUrl: './free-invoice-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        MatError,
        DatePickerComponent,
        UiAutoCompleteComponent,
        MatTabGroup,
        MatTab,
        MatTabLabel,
        CdkTextareaAutosize,
        RouterOutlet,
    ],
})
export class FreeInvoiceDetailComponent
    extends BaseTransactionDetailComponent
    implements OnInit
{
    showCurrency = input(false);
    appName : string;
    constructor(
        protected override loginSrv: LoginService,
        public override entitySrv: FreeInvoiceService,
        public override detailSrv: FreeInvoiceLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected override dialog: MatDialog,
    ) {
        super(
            entitySrv,
            detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            formBuilder,
            confirmationSrv,
            loginSrv,
            dialog,
            'COMMON_EDIT_FREE_INVOICE',
        );
    }

    override ngOnInit() {
        super.ngOnInit();
        this.appName = this.route.snapshot.data['app']
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
            { id: DOC_QUOTATION, description: 'LOGISTICS_PROFORMA' },
            { id: DOC_SALES_ORDER, description: 'SALES_ORDER' },
            { id: DOC_DELIVERY, description: 'COMMON_DELIVERY' },
        ];
    }
}
