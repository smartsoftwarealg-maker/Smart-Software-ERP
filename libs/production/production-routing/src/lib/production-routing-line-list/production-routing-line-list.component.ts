import { Component } from '@angular/core';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import {
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { RoutingOperation } from '../production-routing-services/production-routing-api';
import { ProductionRoutingOperationService } from '../production-routing-services/production-routing-operation.service';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'ss-production-line-list',
    templateUrl: './production-routing-line-list.component.html',
    styleUrls: ['./production-routing-line-list.component.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatSortHeader,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        TranslateDirective,
        MatMiniFabButton,
        TranslatePipe,
        MatTooltip,
    ],
})
export class ProductionRoutingLineListComponent extends BaseChildEntityListComponent<RoutingOperation> {
    override displayedColumns = [
        'operationName',
        'operationNumber',
        'operationType',
        'instructionText',
        'setupInstruction',
    ];

    constructor(
        protected override detailSrv: ProductionRoutingOperationService,
    ) {
        super(detailSrv, 'PROD_PRODUCTIONS_ROUTING');
        this.paginator.pageSize = 10;
    }
}
