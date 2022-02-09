import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationPlanningListComponent } from './vacation-planning-list/vacation-planning-list.component';
import {MaterialModule} from '@ss/common/api-common';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import { VacationPlanningDetailListComponent } from './vacation-planning-detail-list/vacation-planning-detail-list.component';
import { VacationPlanningDetailComponent } from './vacation-planning-detail/vacation-planning-detail.component';
import { VacationPlanningDetailDetailComponent } from './vacation-planning-detail-detail/vacation-planning-detail-detail.component';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        UiPaginationModule,
        CommonUiLangModule,
        CommonUiDatepickerModule
    ],
    declarations: [
      VacationPlanningListComponent,
      VacationPlanningDetailListComponent,
      VacationPlanningDetailComponent,
      VacationPlanningDetailDetailComponent
    ],
})
export class RemunerationVacationPlanningModule {}
