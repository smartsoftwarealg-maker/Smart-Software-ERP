import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ColorSelectComponent} from './color-select.component';
import {MaterialModule} from '@ss/common/api-common';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ColorSelectComponent,
    ],
    exports: [ColorSelectComponent]
})
export class CommonUiColorSelectModule {}
