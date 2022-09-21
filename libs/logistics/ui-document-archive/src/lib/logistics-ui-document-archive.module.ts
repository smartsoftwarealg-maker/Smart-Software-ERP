import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentArchiveComponent } from './document-archive/document-archive.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {CommonUiImageInputModule} from '@ss/common/ui-image-input';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {RouterModule} from '@angular/router';
import {CustomAttributesModule} from '@ss/custom-attributes';
import {AppArchiveModule} from '@ss/common/app-archive';

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
        CustomAttributesModule,
        AppArchiveModule
    ],
    declarations: [DocumentArchiveComponent],
})
export class LogisticsUiDocumentArchiveModule {}
