import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagInputComponent } from './tag-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../smart-lib/components/material.module';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        TagInputComponent
    ],
    exports: [
        TagInputComponent
    ]
})
export class TagInputModule {
}
