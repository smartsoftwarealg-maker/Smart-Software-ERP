import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { CProductLine } from '@ss/costing/costing-utils';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CProductLineService } from '../services/product-line.service';

@Component({
    selector: 'ss-product-line-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        CommonUiConfirmationDialogModule,
        UiPaginationModule,
        CommonUiLangModule
    ],
    templateUrl: './product-line-list.component.html',
    styleUrls: ['./product-line-list.component.css'],
})
export class ProductLineListComponent extends BaseChildEntityListComponent<CProductLine> {
    override displayedColumns = ['reference', 'description', 'units'];

    constructor(protected override detailSrv: CProductLineService) {
        super(detailSrv, 'CProductLine');
    }
}
