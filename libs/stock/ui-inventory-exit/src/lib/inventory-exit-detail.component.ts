import { Component, inject } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryExitService} from '@ss/stock/api-inventory-exit';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LanguageService, LoginService, User} from '@ss/common/api-common';
import {UserListService} from '@ss/common/api-users';
import { BaseTransactionDetailComponent, TransactionLinesService } from "@ss/logistics/api-transaction";
import {MatDialog} from '@angular/material/dialog';
import { InventoryLinesService } from "@ss/stock/api-inventory-lines";
import { InventoryExitLinesService } from "@ss/stock/api-inventory-exit-lines";

@Component({
    selector: 'ss-inventory-exit-detail',
    styleUrls: ['../../../../common/assets/src/assets/transac-detail.scss'],
    templateUrl: './inventory-exit-detail.component.html'
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


    // public override setupForm(b: Transaction) {
    //     // Make sure to update the template if you edit the configuration here
    //     return this.formBuilder.group({
    //         id: [b.id],
    //         document: [0],
    //         centerId: [0 || this.loginSrv.appCtx.center],
    //         date: [b.date || this.langSrv.formatDate(new Date()), Validators.required],
    //         number: [b.number || 0],
    //         reference: [b.reference],
    //         referenceDocDate: [b.referenceDocDate],
    //         header: [b.header],
    //         footer: [b.footer],
    //         dealer: [ { value: b.dealer || this.loginSrv.appCtx.id, disabled: !this.loginSrv.appCtx.manager} , Validators.required]
    //     });
    // }

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
