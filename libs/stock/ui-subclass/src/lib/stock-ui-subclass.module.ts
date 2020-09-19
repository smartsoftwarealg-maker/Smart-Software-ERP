import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { UiLangModule } from '@ss/common/ui-lang';
import { SubclassListComponent } from './subclass-list.component';
import { SubclassDetailComponent } from './subclass-detail.component';
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
        SubclassListComponent,
        SubclassDetailComponent
    ],
    exports: [
        SubclassListComponent,
        SubclassDetailComponent
    ]
})
export class StockUiSubclassModule {}
