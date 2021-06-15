import {NgModule} from '@angular/core';
import {DatePickerComponent} from './date-picker.component';
import {MaterialModule} from '../material.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        DatePickerComponent
    ],
    exports: [
        DatePickerComponent
    ]
})
export class DatePickerModule {
}
