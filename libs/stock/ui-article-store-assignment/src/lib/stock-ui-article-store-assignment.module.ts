import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "@ss/common/api-common";



import {StockUiArticleStoreModule} from "@ss/stock/article-store";

import {RouterModule} from "@angular/router";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";
import {UiStockInfoComponent} from "@ss/logistics/ui-stock-info";
import {ArticleStoreAssignmentComponent} from "./article-store-assignment.component";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,



        StockUiArticleStoreModule,
        RouterModule,
        CommonUiAutoCompleteModule,
        UiStockInfoComponent,
        ArticleStoreAssignmentComponent
    ],
    exports: [ArticleStoreAssignmentComponent]
})
export class StockUiArticleStoreAssignmentModule {}
