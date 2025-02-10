import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { RoutingDetail } from '@ss/cmms/cmms-api';
import { CMMSRoutingDetailService } from '@ss/master-data/cmms-routing';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { MaterialModule } from '@ss/common/api-common';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-cmms-checklist-line-list',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatTableModule, MaterialModule, PaginationComponent, TranslatePipe, TranslateDirective],
    templateUrl: './cmms-checklist-line-list.component.html',
    styleUrls: ['./cmms-checklist-line-list.component.css'],
})
export class CmmsChecklistLineListComponent extends BaseChildEntityListComponent<RoutingDetail> {
    override displayedColumns = ['order', 'description', 'teamSize', 'hours', 'cost'];

    constructor(override detailSrv: CMMSRoutingDetailService) {
        super(detailSrv, 'RoutingDetail');
    }
}
