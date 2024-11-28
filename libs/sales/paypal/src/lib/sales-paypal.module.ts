import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { MaterialModule } from '@ss/common/api-common';


import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';

import { SalesUiDeliveryLinesModule } from '@ss/sales/ui-delivery-lines';
import { LogisticsUiDocImportModule } from '@ss/logistics/ui-doc-import';

import { UiStockInfoComponent } from '@ss/logistics/ui-stock-info';
import { ReviewComponent } from './review/review.component';

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
        CheckoutComponent, ReviewComponent,
    ],
})
export class SalesPaypalModule {}
