import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { F12 } from '../services/balance-tables.api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { F12Service } from '../services/f12-service';
import { AccFileService } from '@ss/accounting/accounting-api';
import { PaginationComponent } from '@ss/common/ui-pagination';
import {TranslateDirective} from "@ss/common/ui-lang";

@Component({
    imports: [
        CommonModule,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatSort,
        MatSortHeader,
        MatTable,
        MatHeaderCellDef,
        PaginationComponent,
        TranslateDirective
    ],
    selector: 'ss-f12-list',
    standalone: true,
    styleUrl: './f12-list.component.scss',
    templateUrl: './f12-list.component.html'
})
export class F12ListComponent extends BaseEntityListComponent<F12> {
    #accFileSrv = inject(AccFileService);
    displayedColumns = ['agentDescription', 'reference', 'refDate', 'amount', 'vat', 'modeDescription'];

    constructor(
        public override entitySrv: F12Service,
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
            'ACC_F12');
        this.pagination.pageSize = 15;
        this.entitySrv.setParentId(this.#accFileSrv.accFile?.id);
    }

}
