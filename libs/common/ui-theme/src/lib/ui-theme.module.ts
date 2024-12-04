import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeDirective } from './theme.directive';
import { ThemeSelect } from '@ss/common/ui-theme';
import { MaterialModule } from '@ss/common/api-common';

@NgModule({
    imports: [CommonModule, MaterialModule, ThemeDirective, ThemeSelect],
    exports: [],
})
export class UiThemeModule { }
