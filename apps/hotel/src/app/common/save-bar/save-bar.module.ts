import {NgModule} from '@angular/core';
import {SaveBarComponent} from './save-bar.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {SmartCommonModule} from 'smart-shared';


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
