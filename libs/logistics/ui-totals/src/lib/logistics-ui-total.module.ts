import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "@ss/common/api-common";


import {ReactiveFormsModule} from "@angular/forms";

import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";
import {TotalComponent} from "./total.component";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        CommonUiDatepickerModule,
        TotalComponent,
    ],
    exports: [
        TotalComponent
    ]
})
export class LogisticsUiTotalModule {
}
