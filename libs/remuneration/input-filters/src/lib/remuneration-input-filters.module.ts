import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFilterListComponent } from './input-filter-list.component';
import { InputFilterDetailComponent } from './input-filter-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CommonUiLangModule} from '@ss/common/ui-lang';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        UiPaginationModule,
        CommonUiLangModule,
        InputFilterListComponent,
        InputFilterDetailComponent
    ],
})
export class RemunerationInputFiltersModule {}
