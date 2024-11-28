import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRequestListComponent } from './purchase-request-list/purchase-request-list.component';
import { PurchaseRequestDetailComponent } from './purchase-request-detail/purchase-request-detail.component';
import { MaterialModule } from '@ss/common/api-common';


import { ReactiveFormsModule } from '@angular/forms';

import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';

import { UiStockInfoComponent } from '@ss/logistics/ui-stock-info';
import { PurchaseRequestLinesDetailComponent } from './purchase-request-lines-detail/purchase-request-lines-detail.component';
import { PurchaseRequestLinesListComponent } from './purchase-request-lines-list/purchase-request-lines-list.component';
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
        PurchaseRequestListComponent,
        PurchaseRequestDetailComponent,
        PurchaseRequestLinesDetailComponent,
        PurchaseRequestLinesListComponent
    ],
})
export class PurchasesUiPurchaseRequestModule {}
