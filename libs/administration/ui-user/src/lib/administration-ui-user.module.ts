import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "@ss/common/api-common";
import {CommonUiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonUiConfirmationDialogModule} from "@ss/common/ui-confirmation-dialog";
import {UserListComponent} from "./user-list.component";
import {UserDetailComponent} from "./user-detail.component";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiAutoCompleteModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule
    ],

    declarations: [
        UserListComponent,
        UserDetailComponent
    ]
})
export class AdministrationUiUserModule {}
