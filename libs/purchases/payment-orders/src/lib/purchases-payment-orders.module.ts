import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentOrderListComponent } from './payment-order-list/payment-order-list.component';
import { PaymentOrderDetailComponent } from './payment-order-detail/payment-order-detail.component';
import {MaterialModule} from '@ss/common/api-common';


import {ReactiveFormsModule} from '@angular/forms';

import {RouterModule} from '@angular/router';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';

import {UiStockInfoComponent} from '@ss/logistics/ui-stock-info';

@NgModule({
    imports: [CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        UiStockInfoComponent, PaymentOrderListComponent,
        PaymentOrderDetailComponent],
})
export class PurchasesPaymentOrdersModule {}
