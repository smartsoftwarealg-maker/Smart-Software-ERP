import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryTransferListComponent } from './inventory-transfer-list/inventory-transfer-list.component';
import { InventoryTransferDetailComponent } from './inventory-transfer-detail/inventory-transfer-detail.component';
import { InventoryTransferLinesDetailComponent } from './inventory-transfer-lines-detail/inventory-transfer-lines-detail.component';
import { InventoryTransferLinesListComponent } from './inventory-transfer-lines-list/inventory-transfer-lines-list.component';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { LogisticsUiDocInfoModule } from '@ss/logistics/ui-doc-info';
import { LogisticsUiStockInfoModule } from '@ss/logistics/ui-stock-info';
import { TransferReceptionListComponent } from './transfer-reception-list/transfer-reception-list.component';
import { TransferReceptionDetailComponent } from './transfer-reception-detail/transfer-reception-detail.component';
import { TransferReceptionLinesListComponent } from './transfer-reception-lines-list/transfer-reception-lines-list.component';
import { TransferReceptionLinesDetailComponent } from './transfer-reception-lines-detail/transfer-reception-lines-detail.component';

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
        LogisticsUiStockInfoModule,
    ],
    declarations: [
        InventoryTransferListComponent,
        InventoryTransferDetailComponent,
        InventoryTransferLinesDetailComponent,
        InventoryTransferLinesListComponent,
        TransferReceptionListComponent,
        TransferReceptionDetailComponent,
        TransferReceptionLinesListComponent,
        TransferReceptionLinesDetailComponent,
    ],
})
export class StockInventoryTransfersModule {}
