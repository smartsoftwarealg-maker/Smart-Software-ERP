import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { OH } from '@ss/costing/costing-utils';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CostingOhService } from '@ss/costing/costing-projects';

@Component({
    selector: 'ss-costing-oh-line',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        CommonUiConfirmationDialogModule,
        UiPaginationModule,
        CommonUiLangModule
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
