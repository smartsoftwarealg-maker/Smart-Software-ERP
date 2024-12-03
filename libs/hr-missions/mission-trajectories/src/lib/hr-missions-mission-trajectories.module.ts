import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrajectoryListComponent } from './trajectory-list/trajectory-list.component';
import { TrajectoryDetailComponent } from './trajectory-detail/trajectory-detail.component';
import {RouterModule} from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';




import { DatePickerComponent } from '@ss/common/ui-datepicker';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,



        DatePickerComponent,

        RouterModule,
        TrajectoryListComponent,
        TrajectoryDetailComponent
    ],
})
export class HrMissionsMissionTrajectoriesModule {}
