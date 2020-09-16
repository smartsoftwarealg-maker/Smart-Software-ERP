import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "@ss/common/api-common";
import {RouterModule} from "@angular/router";
import {UiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {VatDetailComponent} from "./vat-detail.component";
import {VatListComponent} from "./vat-list.component";

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
        VatDetailComponent
    ],
    exports: [
        VatListComponent,
        VatDetailComponent
    ]
})
export class StockUiVatModule {
}
