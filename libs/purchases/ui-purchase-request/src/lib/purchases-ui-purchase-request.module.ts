import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRequestListComponent } from './purchase-request-list/purchase-request-list.component';
import { PurchaseRequestDetailComponent } from './purchase-request-detail/purchase-request-detail.component';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { LogisticsUiDocInfoModule } from '@ss/logistics/ui-doc-info';
import { LogisticsUiStockInfoModule } from '@ss/logistics/ui-stock-info';
import { PurchaseRequestLinesDetailComponent } from './purchase-request-lines-detail/purchase-request-lines-detail.component';
import { PurchaseRequestLinesListComponent } from './purchase-request-lines-list/purchase-request-lines-list.component';

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
        LogisticsUiDocInfoModule,
        LogisticsUiStockInfoModule,
    ],
    declarations: [
        PurchaseRequestListComponent,
        PurchaseRequestDetailComponent,
        PurchaseRequestLinesDetailComponent,
        PurchaseRequestLinesListComponent,
    ],
})
export class PurchasesUiPurchaseRequestModule {}
