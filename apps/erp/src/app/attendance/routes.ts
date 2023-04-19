import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Routes} from '@angular/router';

import {
    ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL,
} from '@ss/common/api-common';
import {
    ATTENDANCE_LOG_URL,
    ATTENDANCE_MACHINES_URL, HOLIDAY_URL, SHIFT_ASSIGNMENT_URL, WORK_SHIFTS_URL
} from '../common';


import {detailGuard, loginGuard, timingGuard} from '../erp-guards';
import {
    AttendanceLogComponent,
    AttendanceMachineDetailComponent,
    AttendanceMachineListComponent, HolidayDetailComponent, HolidayListComponent,
    PersonShiftDetailComponent,
    PersonShiftListComponent, ShiftTimingDetailComponent,
    ShiftTimingListComponent,
    WorkShiftDetailComponent,
    WorkShiftListComponent
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
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', component: ShiftTimingListComponent, pathMatch: 'full'},
                    { path: 'detail',
                        children: [
                            { path: ':id', component: ShiftTimingDetailComponent, canActivate: [timingGuard] }
                        ]
                    }
                ]
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
                canActivate: [loginGuard, detailGuard],
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
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];
