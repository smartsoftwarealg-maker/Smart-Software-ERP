import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { UiLangModule } from '@ss/common/ui-lang';
import { ClassListComponent } from './class-list.component';
import { ClassDetailComponent } from './class-detail.component';
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
        ClassListComponent,
        ClassDetailComponent
    ],
    exports: [
        ClassListComponent,
        ClassDetailComponent
    ]
})
export class StockUiClassModule {}
