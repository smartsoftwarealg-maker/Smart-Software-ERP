import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributesListComponent } from './attributes-list/attributes-list.component';
import { AttributesDetailComponent } from './attributes-detail/attributes-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';

import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {RouterModule} from '@angular/router';
import { ChildAttributesComponent } from './child-attributes/child-attributes.component';
import {CommonUiDefaultReportModule} from '@ss/common/ui-default-report-component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        CommonUiDefaultReportModule,
        RouterModule,
        AttributesListComponent,
        AttributesDetailComponent,
        ChildAttributesComponent,
    ],
    exports: [
        ChildAttributesComponent
    ]
})
export class CustomAttributesModule {}
