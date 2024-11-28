import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrajectoryListComponent } from './trajectory-list/trajectory-list.component';
import { TrajectoryDetailComponent } from './trajectory-detail/trajectory-detail.component';
import {RouterModule} from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';




import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,



        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        RouterModule,
        TrajectoryListComponent,
        TrajectoryDetailComponent
    ],
})
export class HrMissionsMissionTrajectoriesModule {}
