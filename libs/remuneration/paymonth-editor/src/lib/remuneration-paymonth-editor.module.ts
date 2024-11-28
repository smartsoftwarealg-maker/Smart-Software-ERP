import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymonthEditorComponent } from './paymonth-editor/paymonth-editor.component';
import {MaterialModule} from '@ss/common/api-common';



@NgModule({
    imports: [
        CommonModule,
        MaterialModule,

        PaymonthEditorComponent,
    ],
    exports: [
        PaymonthEditorComponent
    ]
})
export class RemunerationPaymonthEditorModule {}
