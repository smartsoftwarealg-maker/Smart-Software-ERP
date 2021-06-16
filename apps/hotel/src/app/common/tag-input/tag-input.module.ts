import {NgModule} from '@angular/core';
import {MaterialModule} from '../material.module';
import {CommonModule} from '@angular/common';
import {TagInputComponent} from './tag-input.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    declarations: [
        TagInputComponent
    ],
    exports: [
        TagInputComponent
    ]
})
export class TagInputModule {
}
