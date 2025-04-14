import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { CProductLine } from '@ss/costing/costing-utils';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';



import { CProductLineService } from '../services/product-line.service';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-product-line-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslatePipe,
        PaginationComponent,
        TranslateDirective
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
