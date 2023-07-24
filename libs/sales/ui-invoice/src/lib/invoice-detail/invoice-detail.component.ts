import { Component, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import { CCGroup, Lookup } from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LoginService} from '@ss/common/api-common';
import {MatDialog} from '@angular/material/dialog';
import { InvoiceLinesService, InvoiceService } from '@ss/sales/api-invoice';
import {
    BaseTransactionDetailComponent,
    DOC_DELIVERY,
    DOC_QUOTATION,
    DOC_SALES_ORDER
} from '@ss/logistics/api-transaction';


@Component({
    selector: 'ss-invoice-detail',
    templateUrl: './invoice-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss']
})
export class InvoiceDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    public groups: CCGroup[];

    constructor(
        protected loginSrv: LoginService,
        public override detailSrv: InvoiceLinesService,
        public override entitySrv: InvoiceService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected dialog: MatDialog) {
        super(entitySrv, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'SALES_EDIT_INVOICE');
    }


    override preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x));
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
            {id: DOC_QUOTATION, description: 'LOGISTICS_PROFORMA'},
            {id: DOC_SALES_ORDER, description: 'SALES_ORDER'},
            {id: DOC_DELIVERY, description: 'SALES_DELIVERY'}
        ];
    }

    // public override setupForm(b: Transaction) {
    //     // Make sure to update the template if you edit the configuration here
    //     if (!b.id) {
    //         b.id = 0;
    //         b.number = 0;
    //         b.userID = this.loginSrv.appCtx.id;
    //         b.dealer = b.userID;
    //         b.date = new DatePipe('en').transform(new Date(), 'dd/MM/yyyy');
    //     }
    //     this.isManager = this.loginSrv.appCtx.manager;
    //     return this.formBuilder.group({
    //         id: [b.id],
    //         document: [0],
    //         centerId: [0 || this.loginSrv.appCtx.center],
    //         date: [b.date || this.langSrv.formatDate(new Date()), Validators.required],
    //         number: [b.number || 0],
    //         reference: [b.reference],
    //         referenceDocDate: [b.referenceDocDate],
    //         payMethod: [b.payMethod, Validators.required],
    //         header: [b.header],
    //         footer: [b.footer],
    //         discountDescription: [b.discountDescription],
    //         fixedDiscount: [b.fixedDiscount || 0.0],
    //         fixedDiscountVAT: [b.fixedDiscountVAT || 0.0],
    //         dealer: [{ value: b.dealer || this.loginSrv.appCtx.id, disabled: !this.isManager }, Validators.required],
    //         agent: [b.agent, true? Validators.required : null],
    //     });
    // }
}
