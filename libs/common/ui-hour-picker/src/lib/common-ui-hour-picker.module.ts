import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourPickerComponent } from './hour-picker/hour-picker.component';
import {MaterialModule} from '@ss/common/api-common';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        HourPickerComponent,
    ],
    exports: [
        HourPickerComponent
    ]
})
export class CommonUiHourPickerModule {}
