import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeDirective } from './theme.directive';
import { ThemeSelect } from './theme-select.component';
import { MaterialModule } from '@ss/common/api-common';

@NgModule({
    imports: [CommonModule, MaterialModule],
    declarations: [ThemeDirective, ThemeSelect],
    exports: [ThemeDirective, ThemeSelect],
})
export class UiThemeModule { }
