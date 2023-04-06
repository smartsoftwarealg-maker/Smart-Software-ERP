import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_ATTENDANCE_LOG_URL,
    ABS_ATTENDANCE_MACHINES_URL,
    ABS_ATTENDANCE_WORKSHIFTS_URL,
    ABS_SHIFT_ASSIGNMENTS_URL
} from '../common';

export const attendanceNavTree: SideNavNode = {
    name: 'ATTENDANCE',
    icon: 'fa-solid fa-clipboard-user',
    children: [
        {
            name: 'ATT_MACHINES',
            icon: 'fa-solid fa-slot-machine',
            route: ABS_ATTENDANCE_MACHINES_URL,
            accessRights: 'AttendanceMachine'
        },
        {
            name: 'ATT_WORKSHIFTS',
            icon: 'fa-solid fa-gauge-min',
            route: ABS_ATTENDANCE_WORKSHIFTS_URL,
            accessRights: 'WorkShift'
        },
        {
            name: 'ATT_SHIFT_ASSIGNMENTS',
            icon: 'fa-solid fa-user-gear',
            route: ABS_SHIFT_ASSIGNMENTS_URL,
            accessRights: 'PersonShift'
        },
        {
            name: 'ATT_ATTENDANCE_LOG',
            icon: 'fa-solid fa-user-gear',
            route: ABS_ATTENDANCE_LOG_URL,
            accessRights: 'Attendance'
        },
    ],
    accessRights: "ATTENDANCE_APP"
};
