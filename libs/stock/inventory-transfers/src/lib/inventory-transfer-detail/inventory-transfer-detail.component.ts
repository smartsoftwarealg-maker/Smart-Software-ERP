import { Component, inject } from '@angular/core';
import { BaseTransactionDetailComponent, TransactionLinesService } from "@ss/logistics/api-transaction";
import {CCGroup, Lookup, LookupsService} from '@ss/common/api-lookup';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LanguageService, LoginService, User} from '@ss/common/api-common';
import {Agent} from '@ss/logistics/api-agent';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UserListService} from '@ss/common/api-users';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TransferService} from '../transfer.service';
import {BranchService} from '@ss/logistics/api-agent';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'ss-inventory-transfer-detail',
    templateUrl: './inventory-transfer-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss']
})
export class InventoryTransferDetailComponent extends BaseTransactionDetailComponent {

    public groups: CCGroup[];

    constructor(
        public override detailSrv: TransactionLinesService,
        protected override loginSrv: LoginService,
        protected override dialog: MatDialog,
        public transferService: TransferService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(transferService, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'STOCK_TRANSFERS');
    }

    override preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x));
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

    // override setupForm(b: Transaction) {
    //     if (!b.id) {
    //         b.id = 0;
    //         b.number = 0;
    //         b.userID = this.loginSrv.appCtx.id;
    //         b.dealer = b.userID;
    //         b.date = new DatePipe('en').transform(new Date(), 'dd/MM/yyyy');
    //     }
    //     this.transfer = b;
    //     this.isManager = this.loginSrv.appCtx.manager;
    //     return this.formBuilder.group({
    //         id: [b.id],
    //         document: [0],
    //         centerId: [0 || this.loginSrv.appCtx.center],
    //         date: [b.date || this.langSrv.formatDate(new Date()), Validators.required],
    //         number: [b.number || 0],
    //         reference: [b.reference],
    //         referenceDocDate: [b.referenceDocDate],
    //         header: [b.header],
    //         payMethod: [b.payMethod],
    //         footer: [b.footer],
    //         discountDescription: [b.discountDescription],
    //         fixedDiscount: [b.fixedDiscount || 0.0],
    //         fixedDiscountVAT: [b.fixedDiscountVAT || 0.0],
    //         dealer: [{ value: b.dealer || this.loginSrv.appCtx.id, disabled: !this.isManager }, Validators.required],
    //         agent: [b.agent, Validators.required],
    //     });
    // }
    //
    // override readForm(): Transaction {
    //     const form =  super.readForm();
    //     fillObject(this.transfer, form)
    //     return form;
    // }
}
