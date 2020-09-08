import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list.component';
import { MaterialModule } from '@ss/common/api-common';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { UiLangModule } from '@ss/common/ui-lang';
import { ArticleDetailComponent } from './article-detail.component';

@NgModule({
    imports: [CommonModule, MaterialModule, UiLangModule, UiPaginationModule],
    exports: [ArticleListComponent, ArticleDetailComponent],
    declarations: [ArticleListComponent, ArticleDetailComponent]
})
export class StockUiArticleModule {}
