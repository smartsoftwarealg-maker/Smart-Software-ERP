import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaymentsListComponent} from './payments-list/payments-list.component';
import {PaymentsDetailComponent} from './payments-detail/payments-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";
import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        PaymentsListComponent,
        PaymentsDetailComponent
    ],
    exports: [
        PaymentsListComponent,
        PaymentsDetailComponent
    ],
})
export class LogisticsPaymentsModule {}
