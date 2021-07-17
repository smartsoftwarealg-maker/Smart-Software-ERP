import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageInputComponent } from './image-input.component';
import { FileUploadModule } from 'ng2-file-upload';
import { MaterialModule } from '../../smart-lib/components/material.module';

@NgModule({
    imports: [
        CommonModule,
        FileUploadModule,
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
