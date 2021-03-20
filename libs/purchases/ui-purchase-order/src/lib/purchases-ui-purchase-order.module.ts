import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";
import {LogisticsUiDocInfoModule} from "@ss/logistics/ui-doc-info";
import {LogisticsUiStockInfoModule} from "@ss/logistics/ui-stock-info";
import {PurchaseOrderListComponent} from "./purchase-order-list.component";
import {PurchaseOrderDetailComponent} from "./purchase-order-detail.component";
import {PurchaseOrderLinesListComponent} from "./purchase-order-lines-list.component";
import {PurchaseOrderLinesDetailComponent} from "./purchase-order-lines-detail.component";

@NgModule({
    imports: [CommonModule,
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
        PurchaseOrderListComponent,
        PurchaseOrderDetailComponent,
        PurchaseOrderLinesListComponent,
        PurchaseOrderLinesDetailComponent
    ],
    exports: [
        PurchaseOrderListComponent,
        PurchaseOrderDetailComponent,
        PurchaseOrderLinesListComponent,
        PurchaseOrderLinesDetailComponent
    ]
})
export class PurchasesUiPurchaseOrderModule {}
