import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePickerComponent} from "./date-picker.component";
import {MaterialModule} from "@ss/common/api-common";

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
export class CommonUiDatepickerModule {}
