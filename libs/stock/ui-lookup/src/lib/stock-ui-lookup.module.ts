import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@ss/common/api-common';
import {RouterModule} from '@angular/router';
import {UiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {UnitListComponent} from './unit/unit-list.component';
import {UnitDetailComponent} from './unit/unit-detail.component';
import {MarkListComponent} from './mark/mark-list.component';
import {MarkDetailComponent} from './mark/mark-detail.component';
import {SubclassDetailComponent} from './subclass/subclass-detail.component';
import {SubclassListComponent} from './subclass/subclass-list.component';
import {ClassDetailComponent} from './class/class-detail.component';
import {ClassListComponent} from './class/class-list.component';
import {StoreNameListComponent} from './store-name/store-name-list.component';
import {StoreNameDetailComponent} from './store-name/store-name-detail.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        UiLangModule,
        UiPaginationModule
    ],
    declarations: [
        UnitListComponent,
        UnitDetailComponent,
        MarkListComponent,
        MarkDetailComponent,
        SubclassListComponent,
        SubclassDetailComponent,
        ClassListComponent,
        ClassDetailComponent,
        StoreNameListComponent,
        StoreNameDetailComponent
    ],
    exports: [
        UnitListComponent,
        UnitDetailComponent,
        MarkListComponent,
        MarkDetailComponent,
        SubclassListComponent,
        SubclassDetailComponent,
        ClassListComponent,
        ClassDetailComponent,
        StoreNameListComponent,
        StoreNameDetailComponent
    ]
})
export class StockUiLookupModule {
}
