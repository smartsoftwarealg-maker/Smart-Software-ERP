import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { MaterialModule } from '../material.module';
import { SmartCommonModule } from "../../common/smart-common.module";

@NgModule({
    declarations: [
        LoadingSpinnerComponent
    ],
    exports: [
        LoadingSpinnerComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SmartCommonModule
    ]
})
export class LoadingSpinnerModule {
}
