import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryCancellationListComponent } from './delivery-cancellation-list.component';
import { DeliveryCancellationDetailComponent } from './delivery-cancellation-detail.component';
import { DeliveryCancellationLinesDetailComponent } from './delivery-cancellation-lines-detail.component';
import { DeliveryCancellationLinesListComponent } from './delivery-cancellation-lines-list.component';
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {RouterModule} from "@angular/router";
import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";
import {LogisticsUiDocInfoModule} from "@ss/logistics/ui-doc-info";
import {LogisticsUiDocImportModule} from "@ss/logistics/ui-doc-import";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        LogisticsUiDocInfoModule,
        LogisticsUiDocImportModule
    ],
  declarations: [
      DeliveryCancellationListComponent,
      DeliveryCancellationDetailComponent,
      DeliveryCancellationLinesDetailComponent,
      DeliveryCancellationLinesListComponent],
})
export class SalesUiDeliveryCancellationModule {}
