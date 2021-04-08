import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PayMethodListComponent} from './pay-method-list.component';
import {PayMethodDetailComponent} from './pay-method-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiAutoCompleteModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule
    ],
  declarations: [
      PayMethodListComponent,
      PayMethodDetailComponent
  ],
  exports: [
      PayMethodListComponent,
      PayMethodDetailComponent
  ]
})
export class LogisticsUiPayMethodModule {}
