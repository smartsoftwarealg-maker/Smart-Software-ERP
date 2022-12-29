import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDetailComponent } from './store-detail.component';
import { StoreListComponent } from './store-list.component';
import { UserStoresComponent } from './user-stores/user-stores.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {LogisticsUiDocInfoModule} from '@ss/logistics/ui-doc-info';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {StockUiArticleStoreModule} from '@ss/stock/article-store';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        RouterModule,
        ReactiveFormsModule,
        LogisticsUiDocInfoModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        StockUiArticleStoreModule
    ],
    declarations: [
        StoreDetailComponent,
        StoreListComponent,
        UserStoresComponent,
    ],
    exports: [StoreDetailComponent, StoreListComponent],
})
export class StockUiStoreModule {}
