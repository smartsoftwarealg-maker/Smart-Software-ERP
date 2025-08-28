import { Component } from '@angular/core';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { Lookup, LookupsService } from '@ss/common/api-lookup';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { BaseTransactionDetailComponent, DOC_PURCHASE_REQUEST, OfferLinesService } from "@ss/logistics/api-transaction";
import {PurchaseQuotationService} from '../purchase-quotation.service';
import {MatDialog} from '@angular/material/dialog';



import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { UiStockInfoComponent } from '@ss/logistics/ui-stock-info';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-proforma-detail',
    templateUrl: './quotation-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    ReactiveFormsModule,
    RouterModule,
    DatePickerComponent,
    UiAutoCompleteComponent
]
})
export class QuotationDetailComponent extends BaseTransactionDetailComponent {

    constructor(public proformaSrv: PurchaseQuotationService,
                public override detailSrv: OfferLinesService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override router: Router,
                public override formBuilder: UntypedFormBuilder,
                public override confirmationSrv: ConfirmationDialogService,
                public lookupsSrv: LookupsService,
                protected loginSrv: LoginService,
                protected override dialog: MatDialog) {
        super(proformaSrv, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'PURCHASES_QUOTATION');
    }

    protected importedDocuments(): Lookup[] {
        return [{ id: DOC_PURCHASE_REQUEST, description: 'PURCHASES_PURCHASE_REQUEST'}];
    }

    protected requireAgent(): boolean {
        return false;
    }

    protected requireAgentToImportDocument(): boolean {
        return false;
    }

    protected showImportButton(): boolean {
        return true;
    }

}
