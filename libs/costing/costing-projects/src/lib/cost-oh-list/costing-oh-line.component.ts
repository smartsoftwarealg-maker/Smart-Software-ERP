import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { OH } from '@ss/costing/costing-utils';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';



import { CostingOhService } from '@ss/costing/costing-projects';
import { TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-costing-oh-line',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslatePipe,
        PaginationComponent
    ],
    templateUrl: './costing-oh-line.component.html',
    styleUrl: './costing-oh-line.component.scss',
})
export class CostingOhLineComponent extends BaseChildEntityListComponent<OH> {
    override displayedColumns = ['description', 'keyDescription', 'amount'];

    constructor(protected override detailSrv: CostingOhService) {
        super(detailSrv, 'COH');
    }
}
