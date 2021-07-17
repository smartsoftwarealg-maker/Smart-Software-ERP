import { NgModule } from '@angular/core';
import { SaveBarComponent } from './save-bar.component';
import { CommonModule } from '@angular/common';
import { SmartCommonModule } from '../../smart-lib/common/smart-common.module';
import { MaterialModule } from '../../smart-lib/components/material.module';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        SmartCommonModule
    ],
    declarations: [
        SaveBarComponent
    ],
    exports: [
        SaveBarComponent
    ]
})
export class SaveBarModule {
}
