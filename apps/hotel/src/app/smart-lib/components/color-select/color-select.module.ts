import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorSelectComponent } from './color-select.component';
import { MaterialModule } from '../material.module';

@NgModule({
    declarations: [
        ColorSelectComponent
    ],
    exports: [
        ColorSelectComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        // BrowserAnimationsModule,
    ]
})
export class ColorSelectModule {
}
