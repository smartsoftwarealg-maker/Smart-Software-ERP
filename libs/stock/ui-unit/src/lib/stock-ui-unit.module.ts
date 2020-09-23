import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { UiLangModule } from '@ss/common/ui-lang';
import { UnitListComponent } from './unit-list.component';
import { UnitDetailComponent } from './unit-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        UiLangModule,
        UiPaginationModule
    ],
    declarations: [
        UnitListComponent,
        UnitDetailComponent
    ],
    exports: [
        UnitListComponent,
        UnitDetailComponent
    ]
})
export class StockUiUnitModule {}
