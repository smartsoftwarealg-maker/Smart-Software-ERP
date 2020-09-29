import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VatDetailComponent} from './vat/vat-detail.component';
import {VatListComponent} from './vat/vat-list.component';
import {MaterialModule} from '@ss/common/api-common';
import {RouterModule} from '@angular/router';
import {UiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {WilayaDetailComponent} from './wilaya/wilaya-detail.component';
import {WilayaListComponent} from './wilaya/wilaya-list.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        UiLangModule,
        UiPaginationModule
    ],
    declarations: [
        VatListComponent,
        VatDetailComponent,
        WilayaDetailComponent,
        WilayaListComponent
    ],
    exports: [
        VatListComponent,
        VatDetailComponent,
        WilayaDetailComponent,
        WilayaListComponent
    ]
})
export class CommonUiLookupModule {
}
