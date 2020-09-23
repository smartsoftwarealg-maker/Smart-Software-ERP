import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { UiLangModule } from '@ss/common/ui-lang';
import { StoreNameListComponent } from './store-name-list.component';
import { StoreNameDetailComponent } from './store-name-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        UiLangModule,
        UiPaginationModule
    ],
    declarations: [
        StoreNameListComponent,
        StoreNameDetailComponent
    ],
    exports: [
        StoreNameListComponent,
        StoreNameDetailComponent
    ]
})
export class StockUiStoreNameModule {}
