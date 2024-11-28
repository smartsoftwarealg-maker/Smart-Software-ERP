import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmListComponent } from './pm-list/pm-list.component';
import { PMDetailComponent } from './pm-detail/pm-detail.component';

import { MatTableModule } from '@angular/material/table';

import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CmmsAlertListComponent } from './cmms-alert-list/cmms-alert-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from "@angular/material/sort";
import { CmmsGanttComponent } from "@ss/cmms/cmms-charts";

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
        MatSortModule,
        CmmsGanttComponent,
        PmListComponent, PMDetailComponent, CmmsAlertListComponent
    ],
})
export class CmmsPmModule {}
