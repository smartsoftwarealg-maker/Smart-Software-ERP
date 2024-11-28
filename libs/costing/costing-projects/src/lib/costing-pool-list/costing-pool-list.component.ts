import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { CPool } from '@ss/costing/costing-utils';
import { CostingPoolService } from '../services/costing-pool.service';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';
import { TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';


@Component({
    selector: 'ss-costing-pool-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslatePipe,
        PaginationComponent
    ],
    templateUrl: './costing-pool-list.component.html',
    styleUrl: './costing-pool-list.component.css',
})
export class CostingPoolListComponent extends BaseChildEntityListComponent<CPool> {
    override displayedColumns = ['ccDescription', 'keyDescription', 'isSupport'];

    constructor(protected override detailSrv: CostingPoolService) {
        super(detailSrv, 'CPool');
    }
}
