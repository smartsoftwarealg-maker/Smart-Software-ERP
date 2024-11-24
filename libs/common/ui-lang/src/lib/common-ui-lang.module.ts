import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectComponent } from './language-select.component';
import { MaterialModule } from '@ss/common/api-common';
import { HttpClientModule } from '@angular/common/http';
import { TranslatePipe } from './translate.pipe';
import {TranslateDirective} from './translate.directive';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule,
        LanguageSelectComponent,
        TranslatePipe,
        TranslateDirective
    ],
    exports: [
        LanguageSelectComponent,
        TranslatePipe,
        TranslateDirective
    ]
})
export class CommonUiLangModule { }
