import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { PM } from '@ss/cmms/cmms-api';
import { AssetPmService } from '../asset-pm.service';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'ss-asset-pm-list',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatSortModule, MatTableModule, UiPaginationModule, MatButtonModule],
    templateUrl: './asset-pm-list.component.html',
    styleUrls: ['./asset-pm-list.component.css'],
})
export class AssetPmListComponent extends BaseChildEntityListComponent<PM>{
    override displayedColumns = [
        'reference',
        'description',
        'assetDescription',
        'planDescription',
        'lastReleased',
        'nextDue',
        'daysAhead'
    ];

    constructor(protected override detailSrv: AssetPmService) {
        super(detailSrv);
    }

}
