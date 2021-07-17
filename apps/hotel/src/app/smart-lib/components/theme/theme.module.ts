import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSelectComponent } from './theme-select.component';
import { ThemeDirective } from './theme.directive';
import { ColorSelectModule } from '../color-select/color-select.module';

@NgModule({
    declarations: [
        ThemeSelectComponent,
        ThemeDirective
    ],
    exports: [
        ThemeSelectComponent,
        ThemeDirective
    ],
    imports: [
        CommonModule,
        ColorSelectModule
    ]
})
export class ThemeModule {
}
