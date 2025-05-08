import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { Lot, LotsService } from '@ss/common/api-lookup';

@Component({
    selector: 'ss-production-lot-management-list',
    styleUrls: ['./lot-management-list.component.scss'],
    templateUrl: './lot-management-list.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        RouterModule,
        PaginationComponent,
    ],
})
export class LotManagementListComponent extends BaseEntityListComponent<Lot> implements OnInit {
    displayedColumns = [
        'description',
        //'descriptionAr',
        'supplier',
        'creationDate',
        'expirationDate',
        'expires',
        //'lotState',
        //'team',
    ];

    constructor(
      public override entitySrv: LotsService,
      public override shellSrv: ShellService,
      public override snackBarSrv: SnackBarService,
      public override route: ActivatedRoute,
      public override confirmationSrv: ConfirmationDialogService,
      public override defReportSrv: DefaultReportService,
      public override router: Router,
      public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'STOCK_LOT_MANAGEMENT');
        this.pagination.pageSize = 15;
    }

}
