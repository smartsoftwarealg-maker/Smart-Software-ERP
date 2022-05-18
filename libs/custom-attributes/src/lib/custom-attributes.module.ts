import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributesListComponent } from './attributes-list/attributes-list.component';
import { AttributesDetailComponent } from './attributes-detail/attributes-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {CommonUiImageInputModule} from '@ss/common/ui-image-input';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {RouterModule} from '@angular/router';

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
      AttributesListComponent,
      AttributesDetailComponent
    ],
})
export class CustomAttributesModule {}
