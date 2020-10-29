import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectComponent } from './language-select.component';
import { MaterialModule } from '@ss/common/api-common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateDirective } from './translate.directive';
import { TranslatePipe } from './translate.pipe';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule
    ],
    declarations: [
        TranslateDirective,
        LanguageSelectComponent,
        TranslatePipe
    ],
    exports: [
        TranslateDirective,
        LanguageSelectComponent,
        TranslatePipe
    ]
})
export class CommonUiLangModule { }
