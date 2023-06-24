import { Component } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import { Lookup, LookupsService } from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LoginService} from '@ss/common/api-common';
import { BaseTransactionDetailComponent, DOC_PURCHASE_REQUEST, OfferLinesService } from "@ss/logistics/api-transaction";
import {PurchaseQuotationService} from '../purchase-quotation.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'ss-proforma-detail',
    templateUrl: './quotation-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss']
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
