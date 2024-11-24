import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiStockInfoComponent } from './lib/ui-stock-info.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        RouterModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        UiStockInfoComponent
    ],
    exports: [UiStockInfoComponent]
})
export class LogisticsUiStockInfoModule {}
