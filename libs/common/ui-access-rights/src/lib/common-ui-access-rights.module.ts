import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessRightsListComponent } from './access-rights-list/access-rights-list.component';
import {MaterialModule} from "@ss/common/api-common";


import {ReactiveFormsModule} from "@angular/forms";

import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";
import {CommonUiAutoCompleteModule} from "@ss/common/ui-auto-complete";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        AccessRightsListComponent,
    ],
})
export class CommonUiAccessRightsModule {}
