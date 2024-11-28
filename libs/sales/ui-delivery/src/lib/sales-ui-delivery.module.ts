import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeliveryListComponent} from './delivery-list/delivery-list.component';
import {DeliveryDetailComponent} from './delivery-detail/delivery-detail.component';
import {MaterialModule} from '@ss/common/api-common';


import {ReactiveFormsModule} from '@angular/forms';

import {RouterModule} from '@angular/router';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';

import {SalesUiDeliveryLinesModule} from '@ss/sales/ui-delivery-lines';
import {LogisticsUiDocImportModule} from '@ss/logistics/ui-doc-import';
import {UiStockInfoComponent} from '@ss/logistics/ui-stock-info';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        SalesUiDeliveryLinesModule,
        LogisticsUiDocImportModule,
        UiStockInfoComponent,
        DocInfoComponent,
        DeliveryListComponent,
        DeliveryDetailComponent
    ],
    exports: [
        DeliveryDetailComponent
    ]
})
export class SalesUiDeliveryModule {
}
