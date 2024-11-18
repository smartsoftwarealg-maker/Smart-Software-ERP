import { Component } from "@angular/core";
import { MaterialModule } from "@ss/common/api-common";
import { RouterOutlet } from "@angular/router";
import { CommonUiConfirmationDialogModule } from "@ss/common/ui-confirmation-dialog";
import { LTMMixtureDetail, LTMTestSchedule } from '@ltm/ltm-api';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";


import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { BaseChildEntityListComponent } from "@ss/common/ui-base-entity";
import { LtmTestScheduleService } from '@ltm/ltm-api';

@Component({
    selector: 'ss-ltm-test-schedule-list',
    templateUrl: './ltm-test-schedule-list.component.html',
    styleUrls: ['./ltm-test-schedule-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,


        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule
    ],
})
export class LtmTestScheduleListComponent extends BaseChildEntityListComponent<LTMTestSchedule> {
    override displayedColumns = ['startDate', 'dueDay', 'nextDate', 'testDate'];

    constructor(protected override detailSrv: LtmTestScheduleService) {
        super(detailSrv, 'LTMTestSchedule');
        this.paginator.pageSize = 100;
    }

    detailCount() {
        return this.paginator?.elementCount || 0;
    }
}
