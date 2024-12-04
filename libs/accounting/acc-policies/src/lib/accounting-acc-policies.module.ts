import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccPoliciesComponent } from './acc-policies.component';
import {MaterialModule} from '@ss/common/api-common';
import {ReactiveFormsModule} from '@angular/forms';
import {UiAutoCompleteComponent} from '@ss/common/ui-auto-complete';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,


        AccPoliciesComponent
    ],
    exports: [
        AccPoliciesComponent
    ]
})
export class AccountingAccPoliciesModule {}
