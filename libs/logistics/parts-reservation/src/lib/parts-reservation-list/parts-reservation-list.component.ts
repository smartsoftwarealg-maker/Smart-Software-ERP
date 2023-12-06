import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Transaction } from '@ss/logistics/api-transaction';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { ReservationService } from '../services/reservation.service';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { LogisticsUiDocInfoModule } from '@ss/logistics/ui-doc-info';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-logistics-parts-reservation',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, LogisticsUiDocInfoModule, MatSortModule, MatTableModule, UiPaginationModule],
    templateUrl: './parts-reservation-list.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-list.scss'],
})
export class PartsReservationListComponent  extends BaseEntityListComponent<Transaction> {
    displayedColumns = [
        'number',
        'date',
        'agent',
        'reference',
        'referenceDocDate',
        'dealer',
        'docStatus'
    ];


    constructor(
        public override entitySrv: ReservationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LOGISTICS_RESERVATION');
    }
}
