import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetTriggerDetailComponent } from './asset-trigger-detail/asset-trigger-detail.component';
import { AssetTriggerListComponent } from './asset-trigger-list/asset-trigger-list.component';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [
        CommonModule,
        CommonUiAutoCompleteModule,
        CommonUiLangModule,
        MatFormFieldModule,
        MatSortModule,
        MatTableModule,
        ReactiveFormsModule,
        UiPaginationModule,
        CommonUiDatepickerModule,
        MatCardModule,
        MatInputModule,
    ],
    declarations: [
        AssetTriggerDetailComponent,
        AssetTriggerListComponent,
    ],
})
export class CmmsAssetTriggersModule {}
