import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageInputComponent} from './image-input.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from "@ss/common/ui-lang";

@NgModule({
    imports: [CommonModule, MaterialModule, CommonUiLangModule],
    exports: [ImageInputComponent],
    declarations: [ImageInputComponent]
})
export class CommonUiImageInputModule {
}
