import { Component } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Lookup} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryExitService} from '@ss/stock/api-inventory-exit';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { BaseTransactionDetailComponent } from "@ss/logistics/api-transaction";
import {MatDialog} from '@angular/material/dialog';
import { InventoryExitLinesService } from "@ss/stock/api-inventory-exit-lines";
import { MatCard, MatCardContent } from '@angular/material/card';

import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
    selector: 'ss-inventory-exit-detail',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    templateUrl: './inventory-exit-detail.component.html',
    standalone: true,
    imports: [MaterialModule, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, DatePickerComponent, UiAutoCompleteComponent, MatError, CdkTextareaAutosize, RouterOutlet]
})
export class InventoryExitDetailComponent extends BaseTransactionDetailComponent {

    constructor(
        protected loginSrv: LoginService,
        protected dialog: MatDialog,
        public inventoryExitService: InventoryExitService,
        public override detailSrv: InventoryExitLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(inventoryExitService, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'STOCK_EDIT_INVENTORY_EXIT');
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
