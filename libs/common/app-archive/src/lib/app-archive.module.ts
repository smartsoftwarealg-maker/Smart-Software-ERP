import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppArchiveMainComponent} from './app-archive-main/app-archive-main.component';
import {AppArchiveListComponent} from './app-archive-list/app-archive-list.component';
import {AppArchiveDetailComponent} from './app-archive-detail/app-archive-detail.component';
import { RouterModule } from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule
    ],

    declarations: [
        AppArchiveMainComponent,
        AppArchiveListComponent,
        AppArchiveDetailComponent
    ],
    exports: [
        AppArchiveMainComponent
    ]
})
export class AppArchiveModule {
}
