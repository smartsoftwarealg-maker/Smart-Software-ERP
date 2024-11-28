import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '@ss/common/api-common';




import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {RouterModule} from '@angular/router';
import {MissionPreparationDetailComponent} from './mission-preparation-detail/mission-preparation-detail.component';
import {MissionPreparationListComponent} from './mission-preparation-list/mission-preparation-list.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,



        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        RouterModule,
        MissionPreparationDetailComponent,
        MissionPreparationListComponent
    ]
})
export class HrMissionsMissionsModule {}
