import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelInjectionComponent } from './excel-injection.component';
import {MaterialModule} from '@ss/common/api-common';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CommonUiLangModule} from '@ss/common/ui-lang';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        UiPaginationModule,
        CommonUiLangModule
    ],
    declarations: [
      ExcelInjectionComponent
    ],
})
export class RemunerationExcelInjectionModule {}
