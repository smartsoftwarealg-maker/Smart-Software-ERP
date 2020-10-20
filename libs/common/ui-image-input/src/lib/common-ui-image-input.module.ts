import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageInputComponent} from "./image-input.component";

@NgModule({
    imports: [CommonModule],
    exports: [ImageInputComponent],
    declarations: [ImageInputComponent]
})
export class CommonUiImageInputModule {
}
