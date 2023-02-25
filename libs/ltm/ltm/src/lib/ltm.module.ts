import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LtmLineListComponent } from './ltm-line-list/ltm-line-list.component';
import { LtmLineDetailComponent } from './ltm-line-detail/ltm-line-detail.component';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { RouterModule } from '@angular/router';
import { LineMatterDetailComponent } from './line-matter-detail/line-matter-detail.component';
import { LineMatterListComponent } from './line-matter-list/line-matter-list.component';
import { LtmMatterDetailComponent } from './ltm-matter-detail/ltm-matter-detail.component';
import { LtmMatterListComponent } from './ltm-matter-list/ltm-matter-list.component';
import { LtmPeriodicitiesListComponent } from './ltm-periodicities-list/ltm-periodicities-list.component';
import { LtmPeriodicitiesDetailComponent } from './ltm-periodicities-detail/ltm-periodicities-detail.component';
import { LtmTestListComponent } from './ltm-test-list/ltm-test-list.component';
import { LtmTestDetailComponent } from './ltm-test-detail/ltm-test-detail.component';
import { LtmMatterTestDetailComponent } from './ltm-matter-test-detail/ltm-matter-test-detail.component';
import { LtmMatterTestListComponent } from './ltm-matter-test-list/ltm-matter-test-list.component';
import { LtmTestingListComponent } from './ltm-testing-list/ltm-testing-list.component';
import { LtmTestingDetailComponent } from './ltm-testing-detail/ltm-testing-detail.component';
import { LtmInjectionComponent } from './ltm-injection/ltm-injection.component';
import { LtmReportComponent } from './ltm-report/ltm-report.component';

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
        RouterModule,
    ],
    exports: [
        LtmLineListComponent,
        LtmLineDetailComponent,
        LineMatterDetailComponent,
        LineMatterListComponent,
        LtmMatterDetailComponent,
        LtmMatterListComponent,
        LtmPeriodicitiesListComponent,
        LtmPeriodicitiesDetailComponent,
        LtmTestListComponent,
        LtmTestDetailComponent,
        LtmMatterTestDetailComponent,
        LtmMatterTestListComponent,
        LtmTestingListComponent,
        LtmTestingDetailComponent,
        LtmInjectionComponent,
        LtmReportComponent,
    ],
    declarations: [
        LtmLineListComponent,
        LtmLineDetailComponent,
        LineMatterDetailComponent,
        LineMatterListComponent,
        LtmMatterDetailComponent,
        LtmMatterListComponent,
        LtmPeriodicitiesListComponent,
        LtmPeriodicitiesDetailComponent,
        LtmTestListComponent,
        LtmTestDetailComponent,
        LtmMatterTestDetailComponent,
        LtmMatterTestListComponent,
        LtmTestingListComponent,
        LtmTestingDetailComponent,
        LtmInjectionComponent,
        LtmReportComponent,
    ],
})
export class LtmModule {}
