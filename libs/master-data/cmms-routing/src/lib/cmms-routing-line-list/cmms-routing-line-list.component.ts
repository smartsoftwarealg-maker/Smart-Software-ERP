import { Component } from '@angular/core';
import { RoutingDetail } from '@ss/cmms/cmms-api';
import { CMMSRoutingDetailService } from '@ss/master-data/cmms-routing';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-routing-line-list',
    templateUrl: './cmms-routing-line-list.component.html',
    styleUrls: ['./cmms-routing-line-list.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        CommonUiLangModule,
        MatSortModule,
        MatTableModule,
        UiPaginationModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterOutlet,
        CommonUiAutoCompleteModule
    ],
})
export class CMMSRoutingLineListComponent extends BaseChildEntityListComponent<RoutingDetail> {

    override displayedColumns = ['order', 'description', 'teamSize', 'hours', 'cost'];

    constructor(protected override detailSrv: CMMSRoutingDetailService) {
        super(detailSrv, 'RoutingDetail');
    }
}
