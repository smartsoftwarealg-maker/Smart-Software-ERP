import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryTransferListComponent } from './inventory-transfer-list/inventory-transfer-list.component';
import { InventoryTransferDetailComponent } from './inventory-transfer-detail/inventory-transfer-detail.component';
import { InventoryTransferLinesDetailComponent } from './inventory-transfer-lines-detail/inventory-transfer-lines-detail.component';
import { InventoryTransferLinesListComponent } from './inventory-transfer-lines-list/inventory-transfer-lines-list.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {LogisticsUiDocInfoModule} from '@ss/logistics/ui-doc-info';
import {LogisticsUiStockInfoModule} from '@ss/logistics/ui-stock-info';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        LogisticsUiDocInfoModule,
        LogisticsUiStockInfoModule
    ],
    declarations: [
        InventoryTransferListComponent,
        InventoryTransferDetailComponent,
        InventoryTransferLinesDetailComponent,
        InventoryTransferLinesListComponent,
    ],
})
export class StockInventoryTransfersModule {}
