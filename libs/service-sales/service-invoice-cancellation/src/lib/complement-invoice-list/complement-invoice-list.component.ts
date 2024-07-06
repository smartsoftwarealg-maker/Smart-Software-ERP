import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import {InvoiceCancellationService} from '@ss/sales/api-invoice-cancellation';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { Transaction } from '@ss/logistics/api-transaction';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';

import { LogisticsUiDocImportModule } from '@ss/logistics/ui-doc-import';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';

@Component({
    selector: 'ss-delivery-list',
    templateUrl: './complement-invoice-list.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-list.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,

        LogisticsUiDocImportModule,
        DocInfoComponent
    ]
})
export class ComplementInvoiceListComponent extends BaseEntityListComponent<Transaction> {

    displayedColumns = [
        'number',
        'date',
        'agent',
        'payMethod',
        'reference',
        'referenceDocDate',
    ];


    constructor(
            public invoiceSrv: InvoiceCancellationService,
            public override shellSrv: ShellService,
            public override snackBarSrv: SnackBarService,
            public override route: ActivatedRoute,
            public override router: Router,
            public override confirmationSrv: ConfirmationDialogService,
            public override defReportSrv: DefaultReportService,
            public override pagPersistSrv: PaginatorPersistenceService) {
        super(invoiceSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'SALES_COMPLEMENT_INVOICE');
    }

}
