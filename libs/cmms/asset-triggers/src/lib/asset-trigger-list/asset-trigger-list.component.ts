import { Component } from '@angular/core';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { AssetTrigger } from '@ss/cmms/cmms-api';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { MaterialModule } from '@ss/common/api-common';
import { CMMSAssetTriggerService } from '../cmms-asset-trigger.service';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-asset-trigger-list',
    templateUrl: './asset-trigger-list.component.html',
    styleUrls: ['./asset-trigger-list.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        CommonUiLangModule,
        MatSortModule,
        MatTableModule,
        UiPaginationModule,
        MaterialModule,
        CommonUiAutoCompleteModule
    ],
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
