import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {OptionsDetailComponent} from "./options-detail.component";
import {CommonUiDatepickerModule, DatePickerComponent} from "@ss/common/ui-datepicker";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiAutoCompleteModule,
        ReactiveFormsModule,
        CommonUiDatepickerModule,
        CommonUiConfirmationDialogModule
    ],
    declarations: [ OptionsDetailComponent ],
    exports: [ OptionsDetailComponent ]
})
export class LogisticsUiOptionsModule {}
