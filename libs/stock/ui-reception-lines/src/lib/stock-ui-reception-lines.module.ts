import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReceptionLinesListComponent} from "./reception-lines-list.component";
import {ReceptionLinesDetailComponent} from "./reception-lines-detail.component";
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        RouterModule,
        CommonUiAutoCompleteModule,
    ],
    declarations: [
        ReceptionLinesListComponent,
        ReceptionLinesDetailComponent,
    ],
    exports: [
        ReceptionLinesListComponent,
        ReceptionLinesDetailComponent
    ]
})
export class StockUiReceptionLinesModule {
}
