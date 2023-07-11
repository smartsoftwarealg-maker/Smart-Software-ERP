import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetListComponent } from './asset-list/asset-list.component';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { TriggerListComponent } from './trigger-list/trigger-list.component';
import { TriggerDetailComponent } from './trigger-detail/trigger-detail.component';
import { ReadingDetailComponent } from './reading-detail/reading-detail.component';
import { ReadingListComponent } from './reading-list/reading-list.component';

@NgModule({
    imports: [
        CommonModule,
        CommonUiLangModule,
        MatSortModule,
        MatTableModule,
        UiPaginationModule,
    ],
    declarations: [
        AssetListComponent,
        TriggerListComponent,
        TriggerDetailComponent,
        ReadingDetailComponent,
        ReadingListComponent,
    ],
})
export class CmmsAssetsModule {}
