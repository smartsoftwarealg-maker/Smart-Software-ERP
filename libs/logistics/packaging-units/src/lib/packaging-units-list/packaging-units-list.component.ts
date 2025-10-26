import { Component } from '@angular/core';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {PaginationComponent} from "@ss/common/ui-pagination";
import {TranslateDirective} from "@ss/common/ui-lang";
import {BaseEntityListComponent} from "@ss/common/ui-base-entity";
import {PackagingUnit} from "../packaging-units.api";
import {ClassService} from "@ss/common/api-lookup";
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {DefaultReportService} from "@ss/common/ui-default-report-component";
import {MaterialModule, PaginatorPersistenceService} from "@ss/common/api-common";
import {PackagingUnitsService} from "../packaging-units.service";

@Component({
    selector: 'ss-packaging-units-list',
    imports: [
        MaterialModule,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatTable,
        PaginationComponent,
        TranslateDirective
    ],
    templateUrl: './packaging-units-list.component.html',
    styleUrl: './packaging-units-list.component.scss',
})
export class PackagingUnitsListComponent extends BaseEntityListComponent<PackagingUnit> {
    displayedColumns = ['description',  'units'];

    constructor(
        public override entitySrv: PackagingUnitsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_CLASSES');
        this.pagination.pageSize = 10;
    }

}
