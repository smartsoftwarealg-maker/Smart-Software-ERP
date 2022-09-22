import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesContractListComponent } from './sales-contract-list/sales-contract-list.component';
import { SalesContractDetailComponent } from './sales-contract-detail/sales-contract-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {AppArchiveModule} from '@ss/common/app-archive';
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
        AppArchiveModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule
    ],
    declarations: [SalesContractListComponent, SalesContractDetailComponent],
})
export class LogisticsContractsModule {}
