import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateDirective } from './translate.directive';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: [
        TranslateDirective
    ],
    exports: [
        TranslateDirective
    ]
})
export class ApiLangModule { }
