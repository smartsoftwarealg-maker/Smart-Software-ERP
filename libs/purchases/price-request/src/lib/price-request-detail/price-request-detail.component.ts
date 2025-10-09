import { Component } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {
    BaseTransactionDetailComponent, DOC_DELIVERY, DOC_PURCHASE_REQUEST, DOC_QUOTATION, DOC_SALES_ORDER, Transaction
} from '@ss/logistics/api-transaction';
import {MatDialog} from '@angular/material/dialog';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { PriceRequestService } from '../services/price-request.service';
import { PriceRequestLinesService } from '../services/price-request-lines.service';

@Component({
    selector: 'ss-price-request-detail',
    templateUrl: './price-request-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, DatePickerComponent, UiAutoCompleteComponent, MatError, MatTabGroup, MatTab, MatTabLabel, CdkTextareaAutosize, RouterOutlet]
})
export class PriceRequestDetailComponent extends BaseTransactionDetailComponent {

    constructor(public orderService: PriceRequestService,
                public override detailSrv: PriceRequestLinesService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override router: Router,
                public override formBuilder: UntypedFormBuilder,
                public override confirmationSrv: ConfirmationDialogService,
                public override lookupsSrv: LookupsService,
                protected override loginSrv: LoginService,
                protected override dialog: MatDialog) {
        super(orderService, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'PURCHASES_PRICE_REQUEST');
    }

    override setupForm(b: Transaction): FormGroup {
        this.purchaseProjectSrv.setParentId(b?.agent || 0);
        return super.setupForm(b);
    }

    override ngOnInit() {
        super.ngOnInit();
        this.currencySrv.load().subscribe();
    }
    protected override showImportButton(): boolean {
        return true;
    }
    protected override requireAgentToImportDocument(): boolean {
        return false;
    }
    protected override requireAgent(): boolean {
        return true;
    }
    protected override importedDocuments(): Lookup[] {
        return [
            {id: DOC_PURCHASE_REQUEST, description: 'PURCHASES_PURCHASE_REQUEST'},
        ];
    }
}
