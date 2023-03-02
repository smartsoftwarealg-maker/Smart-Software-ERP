import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryListComponent } from './inventory-list.component';
import { InventoryDetailComponent } from './inventory-detail.component';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { RouterModule } from '@angular/router';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { StockUiinventoryLinesModule } from '@ss/stock/ui-inventory-lines';
import { LogisticsUiDocInfoModule } from '@ss/logistics/ui-doc-info';
import { PriceRecalculationComponent } from './price-recalcultion/price-recalculation.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        StockUiinventoryLinesModule,
        LogisticsUiDocInfoModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
    ],
    declarations: [
        InventoryListComponent,
        InventoryDetailComponent,
        PriceRecalculationComponent,
    ],
    exports: [InventoryListComponent, InventoryDetailComponent],
})
export class StockUiInventoryModule {}
