import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocInfoComponent} from './doc-info/doc-info.component';
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {RouterModule} from "@angular/router";
import {DocImportService} from "@ss/logistics/ui-doc-import";
import {LogisticsUiStockInfoModule} from "@ss/logistics/ui-stock-info";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        RouterModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        LogisticsUiStockInfoModule
    ],
    exports: [DocInfoComponent],
    declarations: [DocInfoComponent]
})
export class LogisticsUiDocInfoModule {
}
