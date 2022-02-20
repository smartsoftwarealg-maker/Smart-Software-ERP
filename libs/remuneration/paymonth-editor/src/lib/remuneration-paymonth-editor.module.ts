import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymonthEditorComponent } from './paymonth-editor/paymonth-editor.component';
import {MaterialModule} from '@ss/common/api-common';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CommonUiLangModule} from '@ss/common/ui-lang';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
    ],
    declarations: [
        PaymonthEditorComponent
    ],
    exports: [
        PaymonthEditorComponent
    ]
})
export class RemunerationPaymonthEditorModule {}
