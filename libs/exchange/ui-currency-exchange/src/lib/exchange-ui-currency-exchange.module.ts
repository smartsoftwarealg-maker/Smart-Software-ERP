import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {ExchangeUiInfoModule} from '@ss/exchange/ui-info';
import {ExchangeListComponent} from './exchange-list.component';
import {ExchangeDetailComponent} from './exchange-detail.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        ExchangeUiInfoModule
    ],

    declarations: [
        ExchangeListComponent,
        ExchangeDetailComponent
    ],

    exports: [
        ExchangeListComponent,
        ExchangeDetailComponent
    ]
})
export class ExchangeUiCurrencyExchangeModule {}
