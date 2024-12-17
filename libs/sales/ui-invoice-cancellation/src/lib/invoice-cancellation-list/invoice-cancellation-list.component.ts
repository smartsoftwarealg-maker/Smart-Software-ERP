import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { InvoiceCancellationService } from '@ss/sales/api-invoice-cancellation';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { Transaction } from '@ss/logistics/api-transaction';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-invoice-cancellation-list',
    templateUrl: './invoice-cancellation-list.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-list.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        RouterModule,
       

        DocInfoComponent,
        PaginationComponent
    ]
})
export class InvoiceCancellationListComponent extends BaseEntityListComponent<Transaction> {

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
            'SALES_INVOICE_CANCELLATION');
    }

}
