import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { MaterialModule } from '@ss/common/api-common';
import { MatButtonModule } from '@angular/material/button';
import { PrevWorkOrderListComponent } from './prev-work-order-list/prev-work-order-list.component';
import { PrevWorkOrderDetailComponent } from "./prev-work-order-detail/prev-work-order-detail.component";

@NgModule({
    imports: [
        CommonModule,

        MatTableModule,

        CommonUiAutoCompleteModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        CommonUiDatepickerModule,
        MatButtonModule,
        MaterialModule,
        PrevWorkOrderListComponent,
        PrevWorkOrderDetailComponent
    ],
})
export class CmmsPrevWorkOrderModule {}
