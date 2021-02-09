import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocInfoComponent } from './doc-info/doc-info.component';
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        RouterModule
    ],
  exports: [DocInfoComponent],
  declarations: [DocInfoComponent]
})
export class LogisticsUiDocInfoModule {}
