import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectComponent } from './language-select.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        HttpClientModule,
        LanguageSelectComponent
    ],
    exports: [LanguageSelectComponent]
})
export class LanguageModule {
}
