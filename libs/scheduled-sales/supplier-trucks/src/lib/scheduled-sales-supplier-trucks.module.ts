import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierTrucksListComponent } from './supplier-trucks-list/supplier-trucks-list.component';
import { SupplierTrucksDetailComponent } from './supplier-trucks-detail/supplier-trucks-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';

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
    declarations: [SupplierTrucksListComponent, SupplierTrucksDetailComponent],
})
export class ScheduledSalesSupplierTrucksModule {}
