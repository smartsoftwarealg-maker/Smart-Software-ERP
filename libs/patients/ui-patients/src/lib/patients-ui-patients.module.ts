import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientsDetailComponent } from './patients-detail/patients-detail.component';
import {MaterialModule} from "@ss/common/api-common";


import {ReactiveFormsModule} from "@angular/forms";

import {CommonUiDatepickerModule} from "@ss/common/ui-datepicker";

@NgModule({
    imports: [CommonModule,
        MaterialModule,


        ReactiveFormsModule,
        CommonUiDatepickerModule,
         PatientsListComponent,
        PatientsDetailComponent],
    exports: [
        PatientsListComponent,
        PatientsDetailComponent
    ],
})
export class PatientsUiPatientsModule {}
