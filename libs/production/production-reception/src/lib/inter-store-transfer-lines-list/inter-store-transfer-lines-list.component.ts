import { Component } from '@angular/core';
import { MaterialModule } from '@ss/common/api-common';
import { InterStoreTransferLine } from '@ss/logistics/api-transaction';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { CommonModule } from '@angular/common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { InterStoreTransferLinesService } from '../interStoreTransfer-lines.service';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';

@Component({
    selector: 'ss-production-inter-store-transfer-lines-list',
    styleUrl: './inter-store-transfer-lines-list.component.scss',
    templateUrl: './inter-store-transfer-lines-list.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        PaginationComponent,
        DocInfoComponent
    ]
})
export class InterStoreTransferLinesListComponent extends BaseChildEntityListComponent<InterStoreTransferLine> {
    override displayedColumns = [
        'storeDescription',
        'lotDescription',
        'sourceDescription',
        'qty',
        'sourceRef',
        'destinationStore'
    ];

    constructor(protected override detailSrv: InterStoreTransferLinesService) {
        super(detailSrv, 'PROD_INTER_STORE_TRANSFER');
    }

    protected readonly console = console;

    showDetail(id: number) {
        this.router.navigate(
            ['lines-detail', id || 0],
            { relativeTo: this.route.parent}).then();
    }
}
