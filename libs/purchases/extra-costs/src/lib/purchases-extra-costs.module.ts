import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraCostMainComponent } from './extra-cost-main/extra-cost-main.component';
import { ExtraCostListComponent } from './extra-cost-list/extra-cost-list.component';
import { ExtraCostDetailComponent } from './extra-cost-detail/extra-cost-detail.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonUiLangModule } from '@ss/common/ui-lang';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
    imports: [
        CommonModule,
        CommonModule,
        CommonUiLangModule,
        MatSortModule,
        MatTableModule,
        UiPaginationModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MaterialModule,
        ReactiveFormsModule,
        TextFieldModule,
        RouterOutlet,
        RouterLink,
        ExtraCostMainComponent,
        ExtraCostListComponent,
        ExtraCostDetailComponent
    ],
    exports: [
        ExtraCostMainComponent
    ]
})
export class PurchasesExtraCostsModule {}
