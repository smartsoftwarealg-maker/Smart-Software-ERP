import { Component } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    MaterialModule,
    PaginatorPersistenceService,
} from '@ss/common/api-common';
import { Transaction } from '@ss/logistics/api-transaction';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import {ReceptionService} from "@ss/purchases/api-reception";


@Component({
    selector: 'ss-transporter-reception-list',
    styleUrls: ['../../../../../common/assets/src/assets/transac-list.scss'],
    templateUrl: './transporter-reception-list.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        TranslateDirective,
        DocInfoComponent,
        PaginationComponent,
    ],
})
export class TransporterReceptionListComponent extends BaseEntityListComponent<Transaction> {
    displayedColumns = [
        'number',
        'date',
        'agent',
        'payMethod',
        'reference',
        'referenceDocDate',
        'dealer',
        'docStatus',
    ];

    constructor(
        public inventorySrv: ReceptionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            inventorySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'PURCHASES_TRANSPORT_RECEPTIONS',
        );
    }
}
