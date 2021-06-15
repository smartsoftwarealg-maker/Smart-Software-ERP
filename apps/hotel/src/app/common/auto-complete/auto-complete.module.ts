import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutoCompleteComponent} from './auto-complete.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AutoCompleteComponent
    ],
    exports: [
        AutoCompleteComponent
    ]
})
export class AutoCompleteModule {
}
