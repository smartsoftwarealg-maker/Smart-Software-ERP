import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkShiftListComponent } from './work-shift-list/work-shift-list.component';
import { WorkShiftDetailComponent } from './work-shift-detail/work-shift-detail.component';
import { AttendanceMachineDetailComponent } from './attendance-machine-detail/attendance-machine-detail.component';
import { AttendanceMachineListComponent } from './attendance-machine-list/attendance-machine-list.component';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiMainPageModule } from '@ss/common/ui-main-page';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { PersonShiftListComponent } from './person-shift-list/person-shift-list.component';
import { PersonShiftDetailComponent } from './person-shift-detail/person-shift-detail.component';
import { ShiftTimingDetailComponent } from './shift-timing-detail/shift-timing-detail.component';
import { ShiftTimingListComponent } from './shift-timing-list/shift-timing-list.component';
import { RouterOutlet } from '@angular/router';
import { AttendanceLogComponent } from './attendance-log/attendance-log.component';
import { HolidayListComponent } from './holiday-list/holiday-list.component';
import { HolidayDetailComponent } from './holiday-detail/holiday-detail.component';
import { AttendanceLogListComponent } from './attendance-log-list/attendance-log-list.component';
import { AttendanceLogDetailComponent } from './attendance-log-detail/attendance-log-detail.component';
import { HolidayRequestListComponent } from './holiday-request-list/holiday-request-list.component';
import { HolidayRequestDetailComponent } from './holiday-request-detail/holiday-request-detail.component';
import {
    AbsenceMotiveDetailComponent,
    AbsenceMotiveListComponent
} from "./absence-motive-list/absence-motive-list.component";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiMainPageModule,
        CommonUiAutoCompleteModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        RouterOutlet,
    ],
    declarations: [
        WorkShiftListComponent,
        WorkShiftDetailComponent,
        AttendanceMachineDetailComponent,
        AttendanceMachineListComponent,
        PersonShiftListComponent,
        PersonShiftDetailComponent,
        ShiftTimingDetailComponent,
        ShiftTimingListComponent,
        AttendanceLogComponent,
        HolidayListComponent,
        HolidayDetailComponent,
        AttendanceLogListComponent,
        AttendanceLogDetailComponent,
        HolidayRequestListComponent,
        HolidayRequestDetailComponent,
        AbsenceMotiveListComponent,
        AbsenceMotiveDetailComponent
    ],
})
export class AttendanceModule {}
