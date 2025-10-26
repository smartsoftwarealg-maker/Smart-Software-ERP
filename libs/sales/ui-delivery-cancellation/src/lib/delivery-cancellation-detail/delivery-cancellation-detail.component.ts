import { Component, OnInit } from '@angular/core';
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LanguageService, LoginService, MaterialModule } from '@ss/common/api-common';
import {MatDialog} from '@angular/material/dialog';
import {DeliveryCancellationService} from '@ss/sales/api-delivery-cancellation';
import { BaseTransactionDetailComponent, TransactionLinesService } from '@ss/logistics/api-transaction';

import { DatePickerComponent } from '@ss/common/ui-datepicker';


import { DeliveryCancellationLinesService } from '../delivery-cancellation-lines.service';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-delivery-cancellation-detail',
    templateUrl: './delivery-cancellation-detail.component.html',
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
export class DeliveryCancellationDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    constructor(
        protected langSrv: LanguageService,
        protected loginSrv: LoginService,
        public deliveryService: DeliveryCancellationService,
        public override detailSrv: DeliveryCancellationLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        protected dialog: MatDialog) {
        super(deliveryService, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'SALES_DELIVERY_CANCELLATION');
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
        return [{id: 257, description: 'COMMON_DELIVERY'}];
    }
}
