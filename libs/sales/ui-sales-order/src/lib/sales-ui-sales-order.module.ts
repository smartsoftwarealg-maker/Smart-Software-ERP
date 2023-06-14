import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {SalesUiOrderLinesModule} from '@ss/sales/ui-order-lines';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {RouterModule} from '@angular/router';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {LogisticsUiDocInfoModule} from '@ss/logistics/ui-doc-info';
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
            LogisticsUiDocInfoModule,
            SalesUiOrderLinesModule,
            LogisticsUiStockInfoModule],

  declarations: [OrderListComponent,
                 OrderDetailComponent]
})
export class SalesUiSalesOrderModule {}
