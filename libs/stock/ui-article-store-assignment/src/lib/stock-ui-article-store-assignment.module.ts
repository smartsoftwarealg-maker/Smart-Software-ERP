import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {StockUiArticleStoreModule} from "@ss/stock/article-store";

import {RouterModule} from "@angular/router";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";
import {LogisticsUiStockInfoModule} from "@ss/logistics/ui-stock-info";
import {ArticleStoreAssignmentComponent} from "./article-store-assignment.component";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        StockUiArticleStoreModule,
        RouterModule,
        CommonUiAutoCompleteModule,
        LogisticsUiStockInfoModule,
        ArticleStoreAssignmentComponent
    ],
    exports: [ArticleStoreAssignmentComponent]
})
export class StockUiArticleStoreAssignmentModule {}
