import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorSelectComponent } from './color-select.component';
import { MaterialModule } from '../material.module';

@NgModule({
    exports: [
        ColorSelectComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ColorSelectComponent,
    ]
})
export class ColorSelectModule {
}
