import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccPoliciesComponent } from './acc-policies.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiAutoCompleteModule,
        CommonUiConfirmationDialogModule,
        AccPoliciesComponent
    ],
    exports: [
        AccPoliciesComponent
    ]
})
export class AccountingAccPoliciesModule {}
