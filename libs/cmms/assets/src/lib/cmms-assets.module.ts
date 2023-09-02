import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReadingDetailComponent } from './reading-detail/reading-detail.component';
import { ReadingListComponent } from './reading-list/reading-list.component';
import { AssetTriggerDetailComponent } from '@ss/cmms/asset-triggers';

@NgModule({
    imports: [
        CommonModule,
        CommonUiLangModule,
        MatSortModule,
        MatTableModule,
        UiPaginationModule,
    ],
    declarations: [
        AssetTriggerDetailComponent,
        ReadingDetailComponent,
        ReadingListComponent,
    ],
})
export class CmmsAssetsModule {}
