import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { UiLangModule } from '@ss/common/ui-lang';
import { MarkListComponent } from './mark-list.component';
import { MarkDetailCompnent } from './mark-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, MaterialModule, RouterModule, UiLangModule, UiPaginationModule],
    declarations: [
        MarkListComponent,
        MarkDetailCompnent
    ],
    exports: [
        MarkListComponent,
        MarkDetailCompnent
    ]
})
export class StockUiMarkModule {}
