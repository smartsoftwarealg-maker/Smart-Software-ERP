import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesQuotaListComponent } from './sales-quota-list/sales-quota-list.component';
import { SalesQuotaDetailComponent } from './sales-quota-detail/sales-quota-detail.component';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { SalesScheduleListComponent } from './sales-schedule-list/sales-schedule-list.component';
import { SalesScheduleDetailComponent } from './sales-schedule-detail/sales-schedule-detail.component';
import { SalesModeListComponent } from './sales-mode-list/sales-mode-list.component';
import { SalesModeDetailComponent } from './sales-mode-detail/sales-mode-detail.component';
import { PartnerScheduleDetailComponent } from './partner-schedule-detail/partner-schedule-detail.component';

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
    ],
    declarations: [
        SalesQuotaListComponent,
        SalesQuotaDetailComponent,
        SalesScheduleListComponent,
        SalesScheduleDetailComponent,
        SalesModeListComponent,
        SalesModeDetailComponent,
        PartnerScheduleDetailComponent,
    ],
})
export class ScheduledSalesSalesQuotaModule {}
