import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FatalErrorComponent } from './fatal-error.component';
import { SmartCommonModule } from "../../common/smart-common.module";

@NgModule({
    declarations: [
        FatalErrorComponent
    ],
    exports: [
        FatalErrorComponent
    ],
    imports: [
        CommonModule,
        SmartCommonModule
    ]
})
export class FatalErrorModule {
}
