import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectComponent } from './language-select.component';
import { MaterialModule } from '../material.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        LanguageSelectComponent
    ],
    exports: [LanguageSelectComponent]
})
export class LanguageModule {
}
