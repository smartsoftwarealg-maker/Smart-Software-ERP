import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaymentsListComponent} from './payments-list/payments-list.component';
import {PaymentsDetailComponent} from './payments-detail/payments-detail.component';
import {MaterialModule} from '@ss/common/api-common';


import {ReactiveFormsModule} from '@angular/forms';

import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";
import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        ReactiveFormsModule,

        PaymentsListComponent,
        PaymentsDetailComponent
    ],
    exports: [
        PaymentsListComponent,
        PaymentsDetailComponent
    ],
})
export class LogisticsPaymentsModule {}
