import { NgModule } from '@angular/core';
import { VCenterDirective } from './v-center.directive';
import { CommonUiLangModule } from '@ss/common/ui-lang';

@NgModule({
    declarations: [
        VCenterDirective
    ],
    imports: [
    ],
    exports: [
        VCenterDirective,
        CommonUiLangModule
    ]
})
export class SmartCommonModule {
}
