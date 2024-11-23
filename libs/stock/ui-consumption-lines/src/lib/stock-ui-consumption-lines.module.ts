import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsumptionLinesListComponent} from './consumption-lines-list/consumption-lines-list.component';
import {ConsumptionLinesDetailComponent} from './consumption-lines-detail/consumption-lines-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {RouterModule} from '@angular/router';
import {LogisticsUiStockInfoModule} from '@ss/logistics/ui-stock-info';
import {
    ConsumptionCancellationLinesListComponent
} from './consumption-cancellation-lines-list/consumption-cancellation-lines-list.component';
import {
    ConsumptionCancellationLinesDetailComponent
} from './consumption-cancellation-lines-detail/consumption-cancellation-lines-detail.component';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        RouterModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        LogisticsUiStockInfoModule,
        DocInfoComponent,
        ConsumptionLinesListComponent,
        ConsumptionLinesDetailComponent,
        ConsumptionCancellationLinesListComponent,
        ConsumptionCancellationLinesDetailComponent
    ],
    exports: [
        ConsumptionLinesListComponent,
        ConsumptionLinesDetailComponent
    ]
})
export class StockUiConsumptionLinesModule {
}
