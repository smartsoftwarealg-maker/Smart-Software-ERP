import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '@ss/common/api-common';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {ArchiveViewerListComponent} from './archive-viewer-list/archive-viewer-list.component';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        ArchiveViewerListComponent
    ],
})
export class RemunerationArchiveViewerModule {}
