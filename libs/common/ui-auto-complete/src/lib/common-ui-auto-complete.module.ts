import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiAutoCompleteComponent} from './ui-auto-complete.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {CommonUiLangModule} from "@ss/common/ui-lang";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CommonUiLangModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule
    ],
    declarations: [UiAutoCompleteComponent],
    exports: [UiAutoCompleteComponent]
})
export class CommonUiAutoCompleteModule {
}
