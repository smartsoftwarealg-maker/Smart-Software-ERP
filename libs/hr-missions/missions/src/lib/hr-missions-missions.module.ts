import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';

import {UiPaginationModule} from '@ss/common/ui-pagination';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';
import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {RouterModule} from '@angular/router';
import {MissionPreparationDetailComponent} from './mission-preparation-detail/mission-preparation-detail.component';
import {MissionPreparationListComponent} from './mission-preparation-list/mission-preparation-list.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,

        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        RouterModule
    ],

    declarations: [
        MissionPreparationDetailComponent,
        MissionPreparationListComponent
    ]
})
export class HrMissionsMissionsModule {}
