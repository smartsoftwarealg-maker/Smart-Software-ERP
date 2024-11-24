import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportReceptionListComponent } from './import-reception-list/import-reception-list.component';
import { ImportReceptionDetailComponent } from './import-reception-detail/import-reception-detail.component';
import { ImportReceptionLinesDetailComponent } from './import-reception-lines-detail/import-reception-lines-detail.component';
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
import { ImportReceptionLinesListComponent } from './import-reception-lines-list/import-reception-lines-list.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ImportReceptionLinesMainComponent } from './import-reception-lines-main/import-reception-lines-main.component';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';

@NgModule({
    imports: [
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
        DocInfoComponent,
        ImportReceptionListComponent,
        ImportReceptionDetailComponent,
        ImportReceptionLinesDetailComponent,
        ImportReceptionLinesListComponent,
        ImportReceptionLinesMainComponent
    ]
})
export class PurchasesImportedPurchasesModule {}
