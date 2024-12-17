import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSelectComponent } from './theme-select.component';
import { MaterialModule } from '@ss/common/api-common';

@NgModule({
    imports: [CommonModule, MaterialModule, ThemeSelectComponent],
    exports: []
})
export class UiThemeModule { }
