import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryTransferListComponent } from './inventory-transfer-list/inventory-transfer-list.component';
import { InventoryTransferDetailComponent } from './inventory-transfer-detail/inventory-transfer-detail.component';
import { InventoryTransferLinesDetailComponent } from './inventory-transfer-lines-detail/inventory-transfer-lines-detail.component';
import { InventoryTransferLinesListComponent } from './inventory-transfer-lines-list/inventory-transfer-lines-list.component';
import { MaterialModule } from '@ss/common/api-common';


import { ReactiveFormsModule } from '@angular/forms';

import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';

import { UiStockInfoComponent } from '@ss/logistics/ui-stock-info';
import { TransferReceptionListComponent } from './transfer-reception-list/transfer-reception-list.component';
import { TransferReceptionDetailComponent } from './transfer-reception-detail/transfer-reception-detail.component';
import { TransferReceptionLinesListComponent } from './transfer-reception-lines-list/transfer-reception-lines-list.component';
import { TransferReceptionLinesDetailComponent } from './transfer-reception-lines-detail/transfer-reception-lines-detail.component';
import { RouterOutlet } from "@angular/router";
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        UiStockInfoComponent,
        RouterOutlet,
        DocInfoComponent,
        InventoryTransferListComponent,
        InventoryTransferDetailComponent,
        InventoryTransferLinesDetailComponent,
        InventoryTransferLinesListComponent,
        TransferReceptionListComponent,
        TransferReceptionDetailComponent,
        TransferReceptionLinesListComponent,
        TransferReceptionLinesDetailComponent
    ],
})
export class StockInventoryTransfersModule {}
