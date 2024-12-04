import { Component } from '@angular/core';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { AssetTrigger } from '@ss/cmms/cmms-api';

import { MaterialModule } from '@ss/common/api-common';
import { CMMSAssetTriggerService } from '../cmms-asset-trigger.service';
import { CommonModule } from '@angular/common';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';


@Component({
    selector: 'ss-asset-trigger-list',
    templateUrl: './asset-trigger-list.component.html',
    styleUrls: ['./asset-trigger-list.component.css'],
    standalone: true,
    imports: [
        CommonModule,

        MatSortModule,
        MatTableModule,

        MaterialModule,

        PaginationComponent,
        TranslatePipe
    ]
})
export class AssetTriggerListComponent extends BaseChildEntityListComponent<AssetTrigger> {
    override displayedColumns = [
        'description',
        'amount'
    ];

    constructor(protected override detailSrv: CMMSAssetTriggerService) {
        super(detailSrv, 'AssetTrigger');
    }
}
