import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceptionCancellationListComponent } from './reception-cancellation-list/reception-cancellation-list.component';
import { ReceptionCancellationDetailComponent } from './reception-cancellation-detail/reception-cancellation-detail.component';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';

import { LogisticsUiStockInfoModule } from '@ss/logistics/ui-stock-info';
import { ReceptionCancellationLinesDetailComponent } from './reception-cancellation-lines-detail/reception-cancellation-lines-detail.component';
import { ReceptionCancellationLinesListComponent } from './reception-cancellation-lines-list/reception-cancellation-lines-list.component';
import { RouterOutlet } from "@angular/router";
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';

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

        LogisticsUiStockInfoModule,
        RouterOutlet,
        DocInfoComponent
    ],
    declarations: [
        ReceptionCancellationListComponent,
        ReceptionCancellationDetailComponent,
        ReceptionCancellationLinesDetailComponent,
        ReceptionCancellationLinesListComponent,
    ],
})
export class PurchasesReceptionCancellationModule {}
