import { Component, inject, signal, WritableSignal } from '@angular/core';
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
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import {
    RoutingMaterial,
    RoutingOperation,
} from '../production-routing-services/production-routing-api';
import { RoutingMaterialService } from '../production-routing-services/routing-material.service';
import { ProductionRoutingOperationService } from '../production-routing-services/production-routing-operation.service';
import { BehaviorSubject, of, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'ss-production-line-list',
    templateUrl: './routing-material-line-list.component.html',
    styleUrls: ['./routing-material-line-list.component.scss'],
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
        AsyncPipe,
    ],
})
export class RoutingMaterialLineListComponent extends BaseChildEntityListComponent<RoutingMaterial> {
    override displayedColumns = signal<string[]>([
        'consumptionType',
        'quantityPer',
        'scrapPercentage',
        'consumptionPoint',
    ]);

    // Reactive data source
    private dataSubject = new BehaviorSubject<RoutingMaterial[]>([]);
    override data$ = this.dataSubject.asObservable();

    operationsList: WritableSignal<RoutingOperation[] | null> = signal(null);
    selectedOperationId = signal<number>(-1);

    constructor(protected override detailSrv: RoutingMaterialService) {
        super(detailSrv, 'PROD_ROUTING_MATERIAL');
        this.paginator.pageSize = 10;
    }
    operationSrv = inject(ProductionRoutingOperationService);

    override refresh() {
        this.operationSrv
            .getListSimple()
            .pipe(
                tap((data) => {
                    this.operationsList.set(data);
                    this.selectedOperationId.set(data?.[0]?.id ?? 0);
                    this.detailSrv.setParentId(this.selectedOperationId());
                }),
                switchMap(() => this.detailSrv.getPage(this.paginator)),
            )
            .subscribe((data) => {
                this.dataSubject.next(data);
            });
    }

    selectOperation(operation: RoutingOperation) {
        this.selectedOperationId.set(operation.id);
        this.detailSrv.setParentId(operation.id);
        this.detailSrv.getPage(this.paginator).subscribe((data) => {
            this.dataSubject.next(data);
        });
    }
}
