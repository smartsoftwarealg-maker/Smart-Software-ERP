import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteComponent } from './auto-complete.component';
import { MaterialModule } from '../../smart-lib/components/material.module';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        FormsModule,
        ReactiveFormsModule,
        AutoCompleteComponent
    ],
    exports: [
    ]
})
export class AutoCompleteModule {
}
