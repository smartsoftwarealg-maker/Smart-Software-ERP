import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { RouterModule } from '@angular/router';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';

import { PriceRecalculationComponent } from './price-recalcultion/price-recalculation.component';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        RouterModule,

        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        DocInfoComponent
    ],
    declarations: [
        InventoryListComponent,
        InventoryDetailComponent,
        PriceRecalculationComponent,
    ],
    exports: [InventoryListComponent, InventoryDetailComponent],
})
export class StockUiInventoryModule {}
