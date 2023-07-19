import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { MaterialModule } from '@ss/common/api-common';
import { MatButtonModule } from '@angular/material/button';
import { WorkRequestListComponent } from './prev-work-order-list/work-request-list.component';
import { WorkRequestDetailComponent } from "./prev-work-order-detail/work-request-detail.component";

@NgModule({
    imports: [
        CommonModule,
        CommonUiLangModule,
        MatTableModule,
        UiPaginationModule,
        CommonUiAutoCompleteModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        CommonUiDatepickerModule,
        MatButtonModule,
        MaterialModule
    ],
    declarations: [
        WorkRequestListComponent,
        WorkRequestDetailComponent
    ],
})
export class CmmsWorkRequestModule {}
