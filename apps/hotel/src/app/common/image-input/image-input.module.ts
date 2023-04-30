import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageInputComponent } from './image-input.component';
import { MaterialModule } from '../../smart-lib/components/material.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    declarations: [
        ImageInputComponent
    ],
    exports: [
        ImageInputComponent
    ]
})
export class ImageInputModule {
}
