import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetReadingListComponent } from './asset-reading-list/asset-reading-list.component';
import { AssetReadingDetailComponent } from './asset-reading-detail/asset-reading-detail.component';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';

@NgModule({
    imports: [
        CommonModule,
        CommonUiLangModule,
        MatSortModule,
        MatTableModule,
        UiPaginationModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule
    ],
    declarations: [
        AssetReadingListComponent,
        AssetReadingDetailComponent
    ],
})
export class CmmsAssetReadingsModule {}
