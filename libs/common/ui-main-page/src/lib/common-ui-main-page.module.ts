import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { CommonUiLangModule } from '@ss/common/ui-lang';

@NgModule({
    imports: [
        CommonModule,
        CommonUiLangModule
    ],
    declarations: [MainPageComponent],
    exports: [MainPageComponent]
})
export class CommonUiMainPageModule { }
