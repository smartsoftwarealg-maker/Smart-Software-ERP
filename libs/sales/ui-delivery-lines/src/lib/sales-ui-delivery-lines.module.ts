import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeliveryLinesListComponent} from './delivery-lines-list/delivery-lines-list.component';
import {DeliveryLinesDetailComponent} from './delivery-lines-detail/delivery-lines-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {ReactiveFormsModule} from '@angular/forms';
import {DatePickerComponent} from '@ss/common/ui-datepicker';
import {UiAutoCompleteComponent} from '@ss/common/ui-auto-complete';

import { DocInfoComponent } from '@ss/logistics/ui-doc-info';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        DatePickerComponent,

        DocInfoComponent,
        DeliveryLinesListComponent,
        DeliveryLinesDetailComponent
    ],
    exports: [
        DeliveryLinesListComponent,
        DeliveryLinesDetailComponent
    ]
})
export class SalesUiDeliveryLinesModule {
}
