import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentCompensationComponent } from './payment-compensation/payment-compensation.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';

@NgModule({
    imports: [CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule],

    declarations: [
      PaymentCompensationComponent
    ],

    exports: [
      PaymentCompensationComponent
    ],

})
export class LogisticsPaymentCompensationModule {}
