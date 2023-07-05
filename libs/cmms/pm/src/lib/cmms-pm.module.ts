import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmListComponent } from './pm-list/pm-list.component';
import { PMDetailComponent } from './pm-detail/pm-detail.component';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CmmsAlertListComponent } from './cmms-alert-list/cmms-alert-list.component';

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
    ],
    declarations: [PmListComponent, PMDetailComponent, CmmsAlertListComponent],
})
export class CmmsPmModule {}
