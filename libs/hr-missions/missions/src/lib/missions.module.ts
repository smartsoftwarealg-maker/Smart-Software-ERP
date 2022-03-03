import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MissionPreparationListComponent} from './mission-preparation-list/mission-preparation-list.component';
import {MissionPreparationDetailComponent} from './mission-preparation-detail/mission-preparation-detail.component';
import {RouterModule} from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
// import { MatDatepickerModule } from '@matheo/datepicker';
// import { MatNativeDateModule } from '@matheo/datepicker/core';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        CommonUiImageInputModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        RouterModule,
    ],
    declarations: [
      MissionPreparationListComponent,
      MissionPreparationDetailComponent
    ],
    exports: [
      MissionPreparationListComponent,
      MissionPreparationDetailComponent
    ],
})
export class MissionsModule {}
