import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationPlanningListComponent } from './vacation-planning-list/vacation-planning-list.component';
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
      VacationPlanningListComponent
    ],
})
export class RemunerationVacationPlanningModule {}
