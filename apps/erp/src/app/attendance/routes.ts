import {Routes} from '@angular/router';

import {
    ABS_INDEX_URL, CanDeactivateService, LIST_URL,
} from '@ss/common/api-common';
import {
    ABSENCE_MOTIVE_URL,
    ATTENDANCE_LOG_URL,
    ATTENDANCE_MACHINES_URL, HOLIDAY_URL, MANUAL_ATTENDANCE_URL, SHIFT_ASSIGNMENT_URL, WORK_SHIFTS_URL,
    ABSENCE_TYPE_URL
} from '../common';


import {detailGuard, loginGuard, timingGuard} from '../erp-guards';
import {
    AbsenceMotiveDetailComponent,
    AbsenceMotiveListComponent,
    AttendanceLogComponent, AttendanceLogDetailComponent, AttendanceLogListComponent,
    AttendanceMachineDetailComponent,
    AttendanceMachineListComponent, HolidayDetailComponent, HolidayListComponent,
    PersonShiftDetailComponent,
    PersonShiftListComponent, ShiftTimingDetailComponent,
    ShiftTimingListComponent,
    WorkShiftDetailComponent,
    WorkShiftListComponent,
    AbsenceTypesListComponent,
    AbsenceTypesDetailComponent,
} from '@ss/attendance';


export const attendanceRoutes: Routes = [
    {
        path: ATTENDANCE_LOG_URL,
        component: AttendanceLogComponent,
        canActivate: [loginGuard]
    },
    {
        path: ATTENDANCE_MACHINES_URL,
        children: [
            {
                path: LIST_URL,
                component: AttendanceMachineListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AttendanceMachineDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ABSENCE_MOTIVE_URL,
        children: [
            {
                path: LIST_URL,
                component: AbsenceMotiveListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AbsenceMotiveDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: WORK_SHIFTS_URL,
        children: [
            {
                path: LIST_URL,
                component: WorkShiftListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: WorkShiftDetailComponent,
                canActivateChild: [loginGuard],
                children: [
                    {   path: '',
                        redirectTo: 'detail',
                        pathMatch: 'full',
                    },
                    {
                        path: 'detail',
                        children: [
                            { path: '', component: ShiftTimingListComponent, pathMatch: 'full' },
                            { path: ':id', component: ShiftTimingDetailComponent }
                        ]
                    }
                ],
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: SHIFT_ASSIGNMENT_URL,
        children: [
            {
                path: LIST_URL,
                component: PersonShiftListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: PersonShiftDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: MANUAL_ATTENDANCE_URL,
        children: [
            {
                path: LIST_URL,
                component: AttendanceLogListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AttendanceLogDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: HOLIDAY_URL,
        children: [
            {
                path: LIST_URL,
                component: HolidayListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: HolidayDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: ABSENCE_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: AbsenceTypesListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: AbsenceTypesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];
