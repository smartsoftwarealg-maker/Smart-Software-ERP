import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '@ss/common/api-common';


import {ReactiveFormsModule} from '@angular/forms';

import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {CurrencyListComponent} from './currency-list.component';
import {CurrencyDetailComponent} from './currency-detail.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        CurrencyListComponent,
        CurrencyDetailComponent,
    ],
    exports: [
        CurrencyListComponent,
        CurrencyDetailComponent
    ]
})
export class LogisticsUiCurrencyModule {}
