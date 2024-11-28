import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentNumberingListComponent } from './document-numbering-list/document-numbering-list.component';
import { DocumentNumberingDetailComponent } from './document-numbering-detail/document-numbering-detail.component';
import {MaterialModule} from '@ss/common/api-common';


import {ReactiveFormsModule} from '@angular/forms';

import {UiAutoCompleteComponent} from '../../../../common/ui-auto-complete/src/lib/auto-complete.component';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,
        CommonUiAutoCompleteModule,

        DocumentNumberingListComponent,
        DocumentNumberingDetailComponent
    ],
})
export class LogisticsDocumentNumberingModule {}
