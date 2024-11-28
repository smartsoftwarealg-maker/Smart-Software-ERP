import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiAutoCompleteComponent} from './auto-complete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        UiAutoCompleteComponent
    ],
    exports: [UiAutoCompleteComponent],
})
export class CommonUiAutoCompleteModule {
}
