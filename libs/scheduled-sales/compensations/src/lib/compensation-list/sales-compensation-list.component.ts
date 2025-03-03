import { Component, computed, effect, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { Compensation, InvoicePayment } from '../services/compensation-api';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { InvoicePaymentService } from '../services/invoice-payment.service';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { CompensationService } from '../services/compensation.service';

@Component({
    selector: 'ss-compensation-list',
    imports: [CommonModule,
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
        TranslateDirective,
        MatHeaderCellDef,
        MatMiniFabButton,
        TranslatePipe,
        MatTooltip],
    templateUrl: './sales-compensation-list.component.html',
    styleUrl: './sales-compensation-list.component.scss',
})
export class SalesCompensationListComponent extends BaseChildEntityListComponent<Compensation> {
    override displayedColumns = ['description', 'creationTime', 'amount'];

    constructor(entitySrv: CompensationService) {
        super(entitySrv, 'InvoicePayment');
        effect(() => {
            if (entitySrv.parentSignal() >= 0) {
                this.refresh();
            }
        });
    }
}
