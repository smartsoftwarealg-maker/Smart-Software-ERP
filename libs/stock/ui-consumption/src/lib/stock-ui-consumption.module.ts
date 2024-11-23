import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsumptionListComponent} from './consumption-list/consumption-list.component';
import {ConsumptionDetailComponent} from './consumption-detail/consumption-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {RouterModule} from '@angular/router';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {StockUiConsumptionLinesModule} from '@ss/stock/ui-consumption-lines';

import {LogisticsUiStockInfoModule} from '@ss/logistics/ui-stock-info';
import {
    ConsumptionCancellationDetailComponent
} from './consumption-cancellation-detail/consumption-cancellation-detail.component';
import {
    ConsumptionCancellationListComponent
} from './consumption-cancellation-list/consumption-cancellation-list.component';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        StockUiConsumptionLinesModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        LogisticsUiStockInfoModule,
        DocInfoComponent,
        ConsumptionListComponent,
        ConsumptionDetailComponent,
        ConsumptionCancellationDetailComponent,
        ConsumptionCancellationListComponent
    ],
    exports: [
        ConsumptionListComponent,
        ConsumptionDetailComponent,
        ConsumptionCancellationDetailComponent,
        ConsumptionCancellationListComponent
    ]
})
export class StockUiConsumptionModule {
}
