import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraceabilityComponent } from './traceability.component';
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";

@NgModule({
  imports: [
      CommonModule,
      MaterialModule,
      CommonUiLangModule,
      UiPaginationModule,
      ReactiveFormsModule,
      CommonUiConfirmationDialogModule,
      CommonUiDatepickerModule,
  ],
  declarations: [
    TraceabilityComponent
  ],
})
export class CommonUiTraceabilityModule {}
