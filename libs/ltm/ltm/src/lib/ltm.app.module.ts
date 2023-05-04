import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { RouterModule, RouterOutlet } from '@angular/router';
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
import { ReactiveFormsModule } from '@angular/forms';
import { LogisticsUiDocInfoModule } from '@ss/logistics/ui-doc-info';
import { AppArchiveModule } from '@ss/common/app-archive';
import { LtmBatchInputComponent } from './ltm-batch-input/ltm-batch-input.component';
import {CommonUiHourPickerModule} from '@ss/common/ui-hour-picker';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        LogisticsUiDocInfoModule,
        AppArchiveModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule
    ],
    exports: [
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
        LineMatterListComponent,
        LineMatterDetailComponent
    ],
    declarations: [
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
        LtmBatchInputComponent,
        LineMatterListComponent,
        LineMatterDetailComponent
    ],
})
export class LtmAppModule {}
