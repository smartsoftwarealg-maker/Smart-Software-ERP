import { Component, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import {UntypedFormBuilder} from '@angular/forms';
import { CCGroup, Lookup } from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {MatDialog} from '@angular/material/dialog';
import { InvoiceLinesService, InvoiceService } from '@ss/sales/api-invoice';
import {
    BaseTransactionDetailComponent,
    DOC_DELIVERY,
    DOC_QUOTATION,
    DOC_SALES_ORDER
} from '@ss/logistics/api-transaction';
import { CommonModule } from '@angular/common';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { CommonUiLangModule } from '@ss/common/ui-lang';

import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";


@Component({
    selector: 'ss-invoice-detail',
    standalone: true,
    imports: [
        CommonModule,
        CommonUiImageInputModule,
        CommonUiLangModule,

        MatTableModule,
        UiPaginationModule,
        MatSortModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MaterialModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet
    ],
    templateUrl: './service-invoice-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss']
})
export class ServiceInvoiceDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    public groups: CCGroup[];

    constructor(
        protected override  loginSrv: LoginService,
        public override detailSrv: InvoiceLinesService,
        public override entitySrv: InvoiceService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected override dialog: MatDialog) {
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
}
