import { Component } from "@angular/core";
import { MaterialModule } from "@ss/common/api-common";
import { RouterOutlet } from "@angular/router";
import { LTMTestSchedule } from '@ltm/ltm-api';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { BaseChildEntityListComponent } from "@ss/common/ui-base-entity";
import { LtmTestScheduleService } from '@ltm/ltm-api';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-ltm-test-schedule-list',
    templateUrl: './ltm-test-schedule-list.component.html',
    styleUrls: ['./ltm-test-schedule-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        PaginationComponent,
        ReactiveFormsModule,
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
