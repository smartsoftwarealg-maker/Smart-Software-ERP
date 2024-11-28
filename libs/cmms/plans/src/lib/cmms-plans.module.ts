import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CMMSPlanListComponent } from './cmms-plan-list/cmms-plan-list.component';
import { CMMSPlanDetailComponent } from './cmms-plan-detail/cmms-plan-detail.component';

import { MatTableModule } from '@angular/material/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MaterialModule } from '@ss/common/api-common';
import { RouterOutlet } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,

        MatSortModule,
        MatTableModule,

        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterOutlet,
        CMMSPlanListComponent,
        CMMSPlanDetailComponent
    ]
})
export class CmmsPlansModule {}
