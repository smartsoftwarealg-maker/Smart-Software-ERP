import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppArchiveMainComponent } from './app-archive-main/app-archive-main.component';
import { AppArchiveListComponent } from './app-archive-list/app-archive-list.component';
import { AppArchiveDetailComponent } from './app-archive-detail/app-archive-detail.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { AppArchiveRightsComponent } from './app-archive-rights/app-archive-rights.component';
import { AppArchiveViewerComponent } from './app-archive-viewer/app-archive-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
    ],

    declarations: [
        AppArchiveMainComponent,
        AppArchiveListComponent,
        AppArchiveDetailComponent,
        AppArchiveRightsComponent,
        AppArchiveViewerComponent,
    ],
    exports: [AppArchiveMainComponent],
})
export class AppArchiveModule {}
