import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {RouterModule} from '@angular/router';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {LogisticsUiDocInfoModule} from '@ss/logistics/ui-doc-info';
import {LogisticsUiStockInfoModule} from '@ss/logistics/ui-stock-info';
import {ConfirmationDialogComponent} from './confirmation-dialig/confirmation-dialog.component';
import {ArchiveListComponent} from './archive-list/archive-list.component';
import {ArchiveDetailComponent} from './archive-detail/archive-detail.component';
import {ArchiveElementComponent} from './archive-element/archive-element.component';
import {ReportsModule} from '../../../../../apps/hotel/src/app/smart-lib/components/reports/reports.module';
import {TagListComponent} from './tags/tag-list/tag-list.component';
import {TagDetailComponent} from './tags/tag-detail/tag-detail.component';

@NgModule({
    imports: [CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        LogisticsUiDocInfoModule,
        LogisticsUiStockInfoModule, ReportsModule],

    declarations: [
        ConfirmationDialogComponent,
        ArchiveListComponent,
        ArchiveDetailComponent,
        ArchiveElementComponent,
        TagListComponent,
        TagDetailComponent
    ]
})
export class WebArchUiModule {}
