import { NgModule } from '@angular/core';
import { SaveBarComponent } from './save-bar.component';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../smart-lib/components/material.module';


@NgModule({
    imports: [
    CommonModule,
    MaterialModule,
    SaveBarComponent
],
    exports: [
        SaveBarComponent
    ]
})
export class SaveBarModule {
}
