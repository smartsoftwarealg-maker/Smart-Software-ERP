import { Component } from '@angular/core';
import { MaterialModule } from '@ss/common/api-common';
import { InterStoreTransferLine } from '@ss/logistics/api-transaction';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';

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
        'reference',
        'referenceDescription',
        'qty',
    ];

    constructor(protected override detailSrv: InterStoreTransferLinesService) {
        super(detailSrv, 'PInterStore');
    }


    override showDetail(id: number) {
        this.router.navigate(
            ['lines-detail', id || 0],
            { relativeTo: this.route.parent}).then();
    }
}
