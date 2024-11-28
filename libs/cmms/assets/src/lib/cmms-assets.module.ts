import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { ReadingDetailComponent } from './reading-detail/reading-detail.component';
import { ReadingListComponent } from './reading-list/reading-list.component';
import { AssetTriggerDetailComponent } from '@ss/cmms/asset-triggers';

@NgModule({
    imports: [
        CommonModule,

        MatSortModule,
        MatTableModule,

    ],
    declarations: [
        AssetTriggerDetailComponent,
        ReadingDetailComponent,
        ReadingListComponent,
    ],
})
export class CmmsAssetsModule {}
