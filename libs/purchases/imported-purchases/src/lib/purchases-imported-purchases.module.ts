import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportReceptionListComponent } from './import-reception-list/import-reception-list.component';
import { ImportReceptionDetailComponent } from './import-reception-detail/import-reception-detail.component';
import { ImportReceptionLinesDetailComponent } from './import-reception-lines-detail/import-reception-lines-detail.component';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { LogisticsUiDocInfoModule } from '@ss/logistics/ui-doc-info';
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
import { PurchasesUiReceptionModule } from '@ss/purchases/ui-reception';
import { ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { PurchasesExtraCostsModule } from '@ss/purchases/extra-costs';
import { ImportReceptionLinesListComponent } from './import-reception-lines-list/import-reception-lines-list.component';
import { RouterLink, RouterOutlet } from "@angular/router";
import { ImportReceptionLinesMainComponent } from './import-reception-lines-main/import-reception-lines-main.component';

@NgModule({
    declarations: [
        ImportReceptionListComponent,
        ImportReceptionDetailComponent,
        ImportReceptionLinesDetailComponent,
        ImportReceptionLinesListComponent,
        ImportReceptionLinesMainComponent,
    ],
    imports: [
        CommonModule,
        CommonUiLangModule,
        LogisticsUiDocInfoModule,
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
        PurchasesUiReceptionModule,
        ReactiveFormsModule,
        TextFieldModule,
        PurchasesExtraCostsModule,
        RouterOutlet,
        RouterLink
    ]
})
export class PurchasesImportedPurchasesModule {}
