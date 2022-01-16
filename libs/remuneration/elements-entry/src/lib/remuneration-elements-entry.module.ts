import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementsEntryDetailComponent } from './elements-entry-detail.component';
import { ElementsEntryListComponent } from './elements-entry-list.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {RemunerationInputFiltersModule} from '../../../input-filters/src';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        RemunerationInputFiltersModule
    ],
    declarations: [
      ElementsEntryDetailComponent,
      ElementsEntryListComponent
    ],
})
export class RemunerationElementsEntryModule {}
