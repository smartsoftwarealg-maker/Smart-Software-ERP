import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrajectoryListComponent } from './trajectory-list/trajectory-list.component';
import { TrajectoryDetailComponent } from './trajectory-detail/trajectory-detail.component';
import {RouterModule} from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        CommonUiImageInputModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        RouterModule
    ],
    declarations: [
      TrajectoryListComponent,
      TrajectoryDetailComponent
    ],
})
export class HrMissionsMissionTrajectoriesModule {}
