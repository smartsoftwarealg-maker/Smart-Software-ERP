import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '@ss/common/api-common';


import {ReactiveFormsModule} from '@angular/forms';

import {DatePickerComponent} from '@ss/common/ui-datepicker';
import {UiAutoCompleteComponent} from '@ss/common/ui-auto-complete';
import {ExchangeUiInfoModule} from '@ss/exchange/ui-info';
import {ExchangeListComponent} from './exchange-list.component';
import {ExchangeDetailComponent} from './exchange-detail.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        DatePickerComponent,

        ExchangeUiInfoModule,
        ExchangeListComponent,
        ExchangeDetailComponent
    ],
    exports: [
        ExchangeListComponent,
        ExchangeDetailComponent
    ]
})
export class ExchangeUiCurrencyExchangeModule {}
