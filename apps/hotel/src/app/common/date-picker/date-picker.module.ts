import { NgModule } from '@angular/core';
import { DatePickerComponent } from './date-picker.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../smart-lib/components/material.module';

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
