import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { RoutingDetail } from '@ss/cmms/cmms-api';
import { CMMSRoutingDetailService } from '@ss/cmms/lookups';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-cmms-checklist-line-list',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatButtonModule, MatTableModule, UiPaginationModule],
    templateUrl: './cmms-checklist-line-list.component.html',
    styleUrls: ['./cmms-checklist-line-list.component.css'],
})
export class CmmsChecklistLineListComponent extends BaseChildEntityListComponent<RoutingDetail> {
    override displayedColumns = ['order', 'description', 'teamSize', 'hours', 'cost'];

    constructor(override detailSrv: CMMSRoutingDetailService) {
        super(detailSrv);
    }
}
