import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {ReportCatalogDetailComponent} from "./report-catalog-detail.component";
import {ReportCatalogListComponent} from "./report-catalog-list.component";


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule
    ],
    declarations: [ReportCatalogListComponent, ReportCatalogDetailComponent],
    exports: []
})
export class AdministrationUiReportCatalogModule {}
