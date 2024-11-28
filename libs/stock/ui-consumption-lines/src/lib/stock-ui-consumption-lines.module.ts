import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsumptionLinesListComponent} from './consumption-lines-list/consumption-lines-list.component';
import {ConsumptionLinesDetailComponent} from './consumption-lines-detail/consumption-lines-detail.component';
import {MaterialModule} from '@ss/common/api-common';


import {ReactiveFormsModule} from '@angular/forms';

import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {RouterModule} from '@angular/router';
import {UiStockInfoComponent} from '@ss/logistics/ui-stock-info';
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


        ReactiveFormsModule,
        RouterModule,

        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        UiStockInfoComponent,
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
