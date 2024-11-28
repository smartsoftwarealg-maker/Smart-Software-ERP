import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentArchiveComponent } from './document-archive/document-archive.component';
import {MaterialModule} from '@ss/common/api-common';




import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {RouterModule} from '@angular/router';
import {CustomAttributesModule} from '@ss/custom-attributes';
import { AppArchiveMainComponent } from '@ss/common/app-archive';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,




        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,
        AppArchiveMainComponent
    ],
    declarations: [DocumentArchiveComponent],
})
export class LogisticsUiDocumentArchiveModule {}
