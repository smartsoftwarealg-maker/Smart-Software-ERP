import { Component, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {SalesAdsService} from '../sales-ads.service';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Lookup} from '@ss/common/api-lookup';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '../../../../../common/ui-lang/src/lib/translate.directive';
import { PaginationComponent } from '../../../../../common/ui-pagination/src/lib/pagination.component';

@Component({
    selector: 'ss-sales-ads-list',
    templateUrl: './sales-ads-list.component.html',
    styleUrls: ['./sales-ads-list.component.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
    ],
})
export class SalesAdsListComponent  extends BaseEntityListComponent<Lookup>{

    displayedColumns = [
        'description',
    ];

    constructor(
        public override entitySrv: SalesAdsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'SALES_ADS');
    }
}
