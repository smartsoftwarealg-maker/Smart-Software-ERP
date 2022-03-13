import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssetsDetailComponent} from './assets-detail/assets-detail.component';
import {AssetsListComponent} from './assets-list/assets-list.component';
import {RouterModule} from '@angular/router';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CommonUiImageInputModule} from '@ss/common/ui-image-input';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        CommonUiImageInputModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
    ],
    declarations: [
        AssetsDetailComponent,
        AssetsListComponent
    ],
})
export class AssetsComponentModule {
}
