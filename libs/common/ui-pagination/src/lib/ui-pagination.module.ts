import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { MaterialModule } from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        PaginationComponent
    ],
    exports: [
        PaginationComponent
    ]
})
export class UiPaginationModule { }
