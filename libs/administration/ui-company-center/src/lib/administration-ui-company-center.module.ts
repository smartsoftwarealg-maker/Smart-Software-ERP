import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {CompanyCenterTreeComponent} from "./company-center-tree.component";
import {CompanyDetailComponent} from "./company-detail.component";
import {CenterDetailComponent} from "./center-detail.component";


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule
    ],
    declarations: [CompanyCenterTreeComponent, CompanyDetailComponent,CenterDetailComponent],
    exports: []
})
export class AdministrationUiCompanyCenterModule {}
