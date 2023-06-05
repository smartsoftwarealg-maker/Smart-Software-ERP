import { Component, OnInit } from '@angular/core';
import {
    BaseTransactionDetailComponent, TransactionLinesService
} from "@ss/logistics/api-transaction";
import { ReceptionService } from '@ss/purchases/api-reception';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService } from '@ss/common/api-common';
import { MatDialog } from '@angular/material/dialog';
import { Lookup } from '@ss/common/api-lookup';

@Component({
    selector: 'ss-import-reception-detail',
    templateUrl: './import-reception-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss',
        './import-reception-detail.component.scss']
})
export class ImportReceptionDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    selectedIndex = 0;


    constructor(
        public receptionService: ReceptionService,
        public override shellSrv: ShellService,
        public override detailSrv: TransactionLinesService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected override readonly loginSrv: LoginService,
        protected override dialog: MatDialog) {
        super(receptionService, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'STOCK_EDIT_RECEPTION');
    }

    protected showImportButton(): boolean {
        return true;
    }

    protected requireAgent(): boolean {
        return true;
    }


    override ngOnInit() {
        super.ngOnInit();
        this.currencySrv.load().subscribe();
    }

    protected requireAgentToImportDocument(): boolean {
        return true;
    }

    protected importedDocuments(): Lookup[] {
        return [{ id: 2, description: 'LOGISTICS_PURCHASE_ORDER' }];
    }

    navigate(idx: number, url: string) {
        this.selectedIndex = idx;
        this.router.navigate([url], { relativeTo: this.route }).then();
    }
}
