import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "@ss/common/api-common";


import {ReactiveFormsModule} from "@angular/forms";

import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";

import {UiStockInfoComponent} from "@ss/logistics/ui-stock-info";
import {PurchaseOrderListComponent} from "./purchase-order-list/purchase-order-list.component";
import {PurchaseOrderDetailComponent} from "./purchase-order-detail/purchase-order-detail.component";
import {PurchaseOrderLinesListComponent} from "./purchase-order-lines-list/purchase-order-lines-list.component";
import {PurchaseOrderLinesDetailComponent} from "./purchase-order-lines-detail/purchase-order-lines-detail.component";
import { RouterOutlet } from "@angular/router";
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';

@NgModule({
    imports: [CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        UiStockInfoComponent, RouterOutlet, DocInfoComponent, PurchaseOrderListComponent,
        PurchaseOrderDetailComponent,
        PurchaseOrderLinesListComponent,
        PurchaseOrderLinesDetailComponent],
    exports: [
        PurchaseOrderListComponent,
        PurchaseOrderDetailComponent,
        PurchaseOrderLinesListComponent,
        PurchaseOrderLinesDetailComponent
    ]
})
export class PurchasesUiPurchaseOrderModule {}
