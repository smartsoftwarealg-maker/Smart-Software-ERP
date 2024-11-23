import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentOrderListComponent } from './payment-order-list/payment-order-list.component';
import { PaymentOrderDetailComponent } from './payment-order-detail/payment-order-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {RouterModule} from '@angular/router';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';

import {LogisticsUiStockInfoModule} from '@ss/logistics/ui-stock-info';

@NgModule({
    imports: [CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        LogisticsUiStockInfoModule, PaymentOrderListComponent,
        PaymentOrderDetailComponent],
})
export class PurchasesPaymentOrdersModule {}
