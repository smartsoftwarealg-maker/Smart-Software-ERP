import { Component } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    MaterialModule,
    PaginatorPersistenceService,
} from '@ss/common/api-common';
import { InterStoreTransfer } from '@ss/logistics/api-transaction';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { InterStoreTransferService } from '../interStoreTransfer.service';

@Component({
    selector: 'ss-production-inter-store-transfer-list',
    styleUrl: './inter-store-transfer-list.component.scss',
    templateUrl: './inter-store-transfer-list.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        PaginationComponent,
    ],
})
export class InterStoreTransferListComponent extends BaseEntityListComponent<InterStoreTransfer> {
    displayedColumns = ['number', 'date', 'reference'];

    constructor(
        public override entitySrv: InterStoreTransferService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'PROD_INTER_STORE_TRANSFER',
        );
    }
}
