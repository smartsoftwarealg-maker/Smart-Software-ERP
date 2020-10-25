import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageInputComponent} from './image-input.component';
import {MaterialModule} from '@ss/common/api-common';
import {UiLangModule} from "@ss/common/ui-lang";

@NgModule({
    imports: [CommonModule, MaterialModule, UiLangModule],
    exports: [ImageInputComponent],
    declarations: [ImageInputComponent]
})
export class CommonUiImageInputModule {
}
