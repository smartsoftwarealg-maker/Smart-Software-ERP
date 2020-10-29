import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleListComponent} from './article-list.component';
import {MaterialModule} from '@ss/common/api-common';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {ArticleDetailComponent} from './article-detail.component';
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule
    ],
    exports: [ArticleListComponent, ArticleDetailComponent],
    declarations: [ArticleListComponent, ArticleDetailComponent]
})
export class StockUiArticleModule {
}
