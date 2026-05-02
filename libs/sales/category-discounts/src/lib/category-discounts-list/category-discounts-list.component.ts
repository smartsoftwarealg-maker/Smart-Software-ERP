import { Component, computed, effect } from '@angular/core';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { CategoryDiscount } from '../api/category-discount';
import { CMMSAssetReadingService } from '@ss/cmms/asset-readings';
import { CategoryDiscountService } from '../api/category-discount.service';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
} from '@angular/material/table';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatMiniFabButton } from '@angular/material/button';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { DecimalPipe } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'ss-category-discounts-list',
    imports: [
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatMiniFabButton,
        MatRow,
        MatRowDef,
        MatTable,
        PaginationComponent,
        TranslateDirective,
        TranslatePipe,
        DecimalPipe,
        MatHeaderCellDef,
        MatTooltip,
    ],
    templateUrl: './category-discounts-list.component.html',
    styleUrl: './category-discounts-list.component.scss',
})
export class CategoryDiscountsListComponent extends BaseChildEntityListComponent<CategoryDiscount> {
    private updated = effect(() => {
        if (this.detailSrv.curParentId() >= 0) {
            this.refresh();
        }
    })
    override displayedColumns = ['reference', 'description', 'discount'];

    constructor(public override detailSrv: CategoryDiscountService) {
        super(detailSrv, 'AssetReading');
    }
}
