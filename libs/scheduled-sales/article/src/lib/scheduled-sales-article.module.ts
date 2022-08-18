import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleListComponent} from './article-list/article-list.component';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {RouterModule} from '@angular/router';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {LogisticsUiDocInfoModule} from '@ss/logistics/ui-doc-info';
import {LogisticsUiDocImportModule} from '@ss/logistics/ui-doc-import';
import {LogisticsUiStockInfoModule} from '@ss/logistics/ui-stock-info';
import {CommonUiImageInputModule} from '@ss/common/ui-image-input';

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
        LogisticsUiDocImportModule,
        LogisticsUiStockInfoModule,
        CommonUiImageInputModule
    ],
    declarations: [ArticleListComponent, ArticleDetailComponent]
})
export class ScheduledSalesArticleModule {}
