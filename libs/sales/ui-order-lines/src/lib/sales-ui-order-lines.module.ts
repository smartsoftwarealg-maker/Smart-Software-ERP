import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderLinesDetailComponent } from './order-lines-detail.component';
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";
import {LogisticsUiDocInfoModule} from "@ss/logistics/ui-doc-info";
import { OrderLinesListComponent } from './order-lines-list.component';

@NgModule({
  imports: [CommonModule,
            MaterialModule,
            CommonUiLangModule,
            UiPaginationModule,
            ReactiveFormsModule,
            CommonUiConfirmationDialogModule,
            CommonUiDatepickerModule,
            CommonUiAutoCompleteModule,
            LogisticsUiDocInfoModule
          ],
  declarations: [OrderLinesDetailComponent,
                 OrderLinesListComponent],
  exports: [OrderLinesDetailComponent,
            OrderLinesListComponent]
})
export class SalesUiOrderLinesModule {}
